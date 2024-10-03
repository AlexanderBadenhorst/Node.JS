const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const mongoDB = require("mongodb").MongoClient;

const dburl = "mongodb://0.0.0.0:27017";
const dbName = "recipe_db";
//database connection
mongoDB.connect(dburl, (error, client) => {
  if (error) throw error;
  //recipe_db
  let db = client.db(dbName);
  //insert a document into our collection
  db.collection("contacts")
  .insert({
    name: "Michael",
    email: "Maatjie@gmail.com"
  }, (error, db) => {
    if (error) throw error;
    console.log(db);
  });

//find contacts
//print them to console as an array
  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
});

//midleware config
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", homeController.sendPost);

app.get("/name/:myName", homeController.respondWithName);
//error handling middleware
// app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});