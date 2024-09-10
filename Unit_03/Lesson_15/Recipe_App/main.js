"use strict";

const express = require("express");
const  app = express();
const  errorController = require("./controllers/errorController");
const  homeController = require("./controllers/homeController");
const  subscribersController = require("./controllers/subscribersController");
const  layouts = require("express-ejs-layouts");
const  mongoose = require("mongoose");
const  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

var myQuery = Subscriber.findOne({
  name: "Alexander Badenhorst"
}).where("email", /badenhorst/);

myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
  res.render("subscribers", { subscribers: req.data });
});

app.get("/", homeController.index);
app.get("/courses", homeController.showCourses);

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
