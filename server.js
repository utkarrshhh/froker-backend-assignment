const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./Config/db");
const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cors());
dotenv.config();

// const port = process.env.PORT;
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(3001, async () => {
  console.log(`Server is running on port 3001`);
  await connectDb();
});
