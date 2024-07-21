const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// connect to the database mongoose instance
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("mongodb connect");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
