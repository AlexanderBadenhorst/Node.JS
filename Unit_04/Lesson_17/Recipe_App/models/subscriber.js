const mongoose = require("mongoose");

//schema creation
const subscriberSchema = new mongoose.Schema({
  //schema properties
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999, //zipcode must be 5 digits long
  },
  //courses subscribers have been enrolled in
courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
});

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function () {
  return this.model("Subscriber").find({ zipCode: this.zipCode }).exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
