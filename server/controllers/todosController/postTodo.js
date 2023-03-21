const mysql = require("mysql2");
require("dotenv").config();
const { todoPostSchema } = require("../../model/todoPostSchema");

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const postTodo = function postTodo(req, res) {
  let user_id = req.loggedInUser.user_id;
  const { todo, completed } = req.body;

  let validation = todoPostSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const sqlNewTodo = `INSERT INTO todos(user_id, todo, completed) VALUES(?,?,?)`;

  pool.execute(sqlNewTodo, [user_id, todo, completed], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    } else {
      console.log(result);
      res.status(200).json({ message: "New Todo Added!" });
      return;
    }
  });
};

exports.postTodo = postTodo;
