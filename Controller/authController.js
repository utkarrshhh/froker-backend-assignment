const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  calculateMonthlyRepayment,
} = require("../arithematicFunctions/repaymentCalculation");

// configuring dotenv file to fetch the secret key
dotenv.config();

// user signup route function
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
        const age = todaysYear - new Date(dob).getFullYear();
        if (age > 20 && salary >= 25000) {
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

// user login route function
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

// user profile route function
exports.user = async (req, res) => {
  const userReq = req.user;
  if (!userReq) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  } else {
    try {
      const user = await userModel.findById(userReq.id);
      // return res.status(200).json({, success: true });
      let purchasePowerPercentage = 0.3;
      let purchasePowerAmount = user.monthlySalary * purchasePowerPercentage;
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      res.status(200).json({
        purchasePowerAmount,
        "Phone Number": user.phoneNumber,
        Email: user.email,
        "Date of user registration":
          user.dateOfUserRegistration.toLocaleDateString("en-CA", options),
        DOB: user.dateOfBirth.toLocaleDateString("en-CA", options),
        "Monthly Salary": user.monthlySalary,
      });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
};

// user loan repayment amount calculation function
exports.borrow = async (req, res) => {
  const userReq = req.user;
  const { borrowAmount } = req.body;
  try {
    const userTemp = await userModel.findById(userReq.id);
    let tenure = 12;
    let interestRate = 8;
    if (borrowAmount > userTemp.monthlySalary * 0.3) {
      return res.status(400).json({
        message: "Cannot borrow more than purchasing power ",
        success: false,
      });
    } else {
      let purchasingPower = userTemp.monthlySalary * 0.3 - borrowAmount;
      const monthlyRepayment = calculateMonthlyRepayment(
        borrowAmount,
        interestRate,
        tenure
      );
      return res.status(200).json({
        "New Purchasing Power": purchasingPower,
        "Monthly repayment Amount": monthlyRepayment,
        tenure: `${tenure} months`,
      });
    }
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};
