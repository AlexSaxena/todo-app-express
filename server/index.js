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
app.post("/register", (req, res) => {});

// POST Login
app.post("/login", (req, res) => {});

// POST Add ToDo
app.post("/addTodo", (req, res) => {});

// GET Show All ToDos
app.get("/", (req, res) => {});

// Server Port
app.listen(5050);
