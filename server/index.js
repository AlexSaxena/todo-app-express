console.log("General Kenobi");

// Require / Imports
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

// MySql Configurations / Definitions
const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};
const app = express();

// Enables JSON to be read
app.use(express.json());

// Creates pool for MySql Connections
const pool = mysql.createPool(config);

// Code - Functionality

// POST Register User
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const cryptedPassword = bcrypt.hashSync(password, salt);

  const sql = `
  INSERT INTO users(username, password)
  VALUES(?, ?)
  `;

  pool.execute(sql, [username, cryptedPassword], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      console.log(result);
      res.json(result).status(200);
    }
  });
});

// POST Login User
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sqlUPassword = `Select user_id, username, password from users WHERE username = ?`;

  pool.execute(sqlUPassword, [username], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    }
    if (result.length < 1) {
      res.status(404).send("User Not Found");
    } else {
      console.log(result);
      const resPassword = result[0].password;
      const passCompare = bcrypt.compareSync(password, resPassword);

      if (passCompare) {
        let userCopy = Object.assign({}, result[0]);
        delete userCopy.password;

        const loginToken = jwt.sign(userCopy, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: 42000,
        });

        // Cookie
        res.cookie("loginToken", loginToken, {
          maxAge: 4201337,
          sameSite: "none",
          httpOnly: true,
          // secure: true,
        });

        res.json({ loginToken: loginToken }).status(200);
      } else {
        res.sendStatus(401);
      }
    }
  });
});

// POST Add ToDo
app.post("/todos", (req, res) => {});

// GET Show All ToDos
app.get("/", (req, res) => {});

// Server Port
app.listen(5050);
