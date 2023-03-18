const express = require("express");
const { login } = require("../controllers/userAuthController/login");
const { register } = require("../controllers/userAuthController/register");

const userAuthRoutes = express.Router();

userAuthRoutes.post("/register", register);

userAuthRoutes.post("/login", login);

exports.userAuthRoutes = userAuthRoutes;
