console.log("General Kenobi");

// Require / Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

// Configurations / Definitions
const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};
const app = express();
