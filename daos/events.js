const mongoose = require("mongoose");


const eventsSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  description: String,
  image: [String],
  users: [String],
  createdby: String,
  eventdate: String,
  eventtime: String,
});

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("events", eventsSchema);


