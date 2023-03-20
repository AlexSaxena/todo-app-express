const mysql = require("mysql2");
require("dotenv").config();

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const getFriend = function getFriend(req, res) {};

exports.getFriend = getFriend;
