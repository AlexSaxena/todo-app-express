console.log("General Kenobi");

// Require / Imports
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const { checkLoginToken } = require("./middlewares/checkLoginToken");

// MySql Configurations / Definitions
const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};
const app = express();

// Enables Cookies to be read
app.use(cookieParser());
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
          expiresIn: 4201337,
        });

        // Cookie
        res.cookie("loginToken", loginToken, {
          maxAge: 4201337,
          sameSite: "none",
          httpOnly: true,
          // secure: true,
        });

        res.json({ loginToken: loginToken }).status(200);
        return;
      } else {
        res.sendStatus(401);
      }
    }
  });
});

// Get ToDos
app.get("/todos", checkLoginToken, (req, res) => {
  console.log("todos-req.loggedInUser ->", req.loggedInUser);

  let user_id = req.loggedInUser.user_id;

  const sqlTodos = `SELECT todo_id, todo, completed FROM todos WHERE user_id=?`;

  pool.execute(sqlTodos, [user_id], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    } else {
      console.log(result);
      res.json(result).status(200);
      return;
    }
  });
});

// POST ToDo
app.post("/todos", checkLoginToken, (req, res) => {
  let user_id = req.loggedInUser.user_id;
  const { todo, completed } = req.body;
  const sqlNewTodo = `INSERT INTO todos(user_id, todo, completed) VALUES(?,?,?)`;

  pool.execute(sqlNewTodo, [user_id, todo, completed], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    } else {
      console.log(result);
      res.status(200).send("New Todo Added!");
      return;
    }
  });
});

// Update Todo -> done true/false
// Patch updates certain part Put updates entire entity
// Send todo_id inside request ie. user sends desired todo item to be changed
// FronteEnd must send todo_id & Completed in Fetch body: request
app.patch("/todos", checkLoginToken, (req, res) => {
  let user_id = req.loggedInUser.user_id;
  const { todo_id, completed } = req.body;
  //const sqlTodoCompleted = `UPDATE todos SET completed = (? - 1)*-1 WHERE todo_id= ? AND user_id = ? `;
  const sqlTodoCompleted = `UPDATE todos SET completed = ? WHERE todo_id= ? AND user_id = ? `;

  pool.execute(
    sqlTodoCompleted,
    [completed, todo_id, user_id],
    (error, result) => {
      if (error) {
        console.error("Error sql Patch -> ", error);
        res.sendStatus(500);
        return;
      } else {
        console.log(result);
        res.status(200).send("Patch Completed!");
        return;
      }
    }
  );
});

// Server Port
app.listen(5050, () => {
  console.log(`\x1b[33m  Server running on http://localhost:5050 \x1b[0m`);
});
