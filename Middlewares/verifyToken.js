const jwt = require("jsonwebtoken");

// middle ware to verify jwt token as per user request the backend
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: err.message, success: false, random: "what" });
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
