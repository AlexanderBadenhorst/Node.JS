/*************SUBSCRIBERS*************/
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

//connection
mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
});
//using promises like main.js
mongoose.Promise = global.Promise;

Subscriber.create({
  name: "Jon",
  email: "jon@jonwexler.com",
  zipCode: "12345",
})
  .then((subscriber) => console.log(subscriber))
  .catch((error) => console.log(error.message));
var subscriber;
Subscriber.findOne({
  name: "Jon",
}).then((result) => {
  subscriber = result;
  console.log(subscriber.getInfo());
});

/*************COURSES*************/
const Course = require("./models/course");

let testCourse, testSubscriber;

//creating course
Course.create({
  title: "Tomato Land",
  description: "Locally farmed tomatoes only",
  zipCode: 12345,
  items: ["cherry", "heirloom"],
}).then((course) => (testCourse = course));

//find subscriber
Subscriber.findOne({}).then((subscriber) => (testSubscriber = subscriber));

//add courses id to the subscriber
testSubscriber.courses.push(testCourse._id);

//save subscriber
testSubscriber.save();

//poppulate subscribers course array with courses theyre enrolled in
Subscriber.populate(testSubscriber, "courses").then((subscriber) =>
  console.log(subscriber)
);
