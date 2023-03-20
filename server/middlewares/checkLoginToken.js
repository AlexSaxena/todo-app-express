const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.checkLoginToken = function checkLoginToken(req, res, next) {
  if (!req.cookies.loginToken) {
    // Maybe Add redirect to Login page
    res.status(404).json({ message: "No Active LoginToken" });
    return;
  }
  try {
    const loginToken = req.cookies.loginToken;
    const loggedInUser = jwt.verify(loginToken, SECRET);
    req.loggedInUser = loggedInUser;
    next();
    return;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized LoginToken" });
    return;
  }
};
