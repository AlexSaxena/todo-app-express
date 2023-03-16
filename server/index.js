console.log("General Kenobi");

// Require / Imports
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
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

// POST Register
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

// POST Login
app.post("/login", (req, res) => {});

// POST Add ToDo
app.post("/addTodo", (req, res) => {});

// GET Show All ToDos
app.get("/", (req, res) => {});

// Server Port
app.listen(5050);
