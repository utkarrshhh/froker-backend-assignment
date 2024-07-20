const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true,
    minlength: [10, "Phone Number should be at least of 10 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be atleast of 8 characters"],
  },
  name: {
    type: String,
    required: true,
  },
  dateOfUserRegistration: {
    type: Date,
    default: Date.now,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
