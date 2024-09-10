const mongoose = require('mongoose');

//schema creation
const subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });
  
module.exports = mongoose.model("Subscriber", subscriberSchema);