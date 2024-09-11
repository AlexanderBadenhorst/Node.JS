const mongoose = require("mongoose");

//schema creation
const courseSchema = new mongoose.Schema({
  //schema properties
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code must be 5 digits long"],
    max: 99999, //zipcode must be 5 digits long
  },
});