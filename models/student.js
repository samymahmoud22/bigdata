const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  department: String,
  courses: [String],
  degree: String,
  age: Number
});

module.exports = mongoose.model("Student", StudentSchema);
