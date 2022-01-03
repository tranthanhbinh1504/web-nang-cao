var mongoose = require("mongoose");

var departmentSchema = mongoose.Schema({
    name: String,
});
var Department = mongoose.model('Department', departmentSchema);
module.exports = Department;