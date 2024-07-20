const jwt = require("jsonwebtoken");

const generateToken = (req, res, next) => {
  const { user } = req;
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" } // Token expiration time
  );

  // Attach the token to the response object
  res.token = token;
  next();
};

module.exports = generateToken;
