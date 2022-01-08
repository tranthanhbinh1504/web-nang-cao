// Mongoose db Connection
var mongoose = require("mongoose");

const userStruct = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  class: String,
  avatar: String,
  department: [{
    departmentID:String,
    departmentName: String,
  }],
  role: String,
});

const userSchema = new mongoose.Schema(userStruct);
const User = mongoose.model('User', userSchema);
module.exports = User;