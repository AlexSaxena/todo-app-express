const mysql = require("mysql2");
require("dotenv").config();

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const getTodo = function getTodo(req, res) {
  let user_id = req.loggedInUser.user_id;

  const sqlTodos = `
        SELECT todo_id, todo, completed 
        FROM todos 
        WHERE user_id=?
        `;

  pool.execute(sqlTodos, [user_id], (error, result) => {
    if (error) {
      console.error("getTodo err ->", error);
      res.sendStatus(500);
      return;
    } else {
      console.log("getTodos res ->", result);
      res.json(result).status(200);
      return;
    }
  });
};

exports.getTodo = getTodo;
