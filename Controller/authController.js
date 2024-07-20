const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { boolean } = require("webidl-conversions");
const dotenv = require("dotenv");

dotenv.config();

exports.signup = async (req, res) => {
  const { name, email, phoneNumber, password, salary, dob } = req.body;
  let ifUser = "";
  if (!name || !email || !phoneNumber || !password || !salary || !dob) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  } else {
    try {
      ifUser = await userModel.findOne({ email });
      if (ifUser) {
        return res
          .status(400)
          .json({ message: "Email already exists.", success: false });
      } else {
        const todaysYear = new Date(Date.now()).getFullYear();
        console.log(todaysYear);
        const age = todaysYear - new Date(dob).getFullYear();
        if (age > 20 && salary >= 25000) {
          console.log("here2");
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const user = new userModel({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            monthlySalary: salary,
            password: hashedPassword,
            dateOfBirth: dob,
          });
          await user.save();
          return res
            .status(200)
            .json({ message: "User created successfully", success: true });
        } else {
          return res.status(400).json({
            msg: `validation criteria failed - ${
              salary < 25000
                ? "salary cannot be less than 25000"
                : age < 20
                ? "age eligbility criteria failed"
                : phoneNumber.length < 10
                ? "Phone number should be atleast 10 characters"
                : ""
            }`,
            success: false,
          });
        }
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  } else {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(404)
            .json({ message: "Password mismatch", success: false });
        } else {
          payload = { email: user.email, id: user._id };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          console.log(token);
          return res
            .status(200)
            .json({ message: "login successful", token, success: true });
        }
      }
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
};
