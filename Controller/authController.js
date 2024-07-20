const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, phoneNumber, password, salary, dob } = req.body;
  if (!name || !email || !phoneNumber || !password || !salary || !dob) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  } else {
    try {
      const ifUser = await userModel.findOne({ email });
      if (ifUser) {
        return res
          .status(400)
          .json({ message: "Email already exists.", success: false });
      } else {
        const todaysYear = new Date(Date.now()).getFullYear();
        console.log("here");
        console.log(todaysYear);
        const age = todaysYear - new Date(dob).getFullYear();
        console.log(age);
        if (age > 20 && salary >= 25000) {
          console.log("here2");
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          console.log("here3");
          const user = new userModel({
            name,
            email,
            phoneNumber,
            monthlySalary: salary,
            password: hashedPassword,
            dateOfBirth: dob,
          });
          await user.save();
          return res
            .status(200)
            .json({ message: "User created successfully", success: true });
        } else {
          return res
            .status(400)
            .json({ msg: "validation criteria failed", success: false });
        }
        console.log("here4");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error", success: false });
    }
  }
};
