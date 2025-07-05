const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  jwt: String,
  is_admin: Boolean,
  name: String,
});

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("users", userSchema);


