const mysql = require("mysql2");
require("dotenv").config();

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const deleteTodo = function deleteTodo(req, res) {
  let user_id = req.loggedInUser.user_id;
  const { todo_id } = req.body;

  const sqlDeleteTodo = `DELETE FROM todos WHERE todo_id = ? AND user_id = ?;`;

  pool.execute(sqlDeleteTodo, [todo_id, user_id], (error, result) => {
    if (error) {
      console.log("Error Sql Delete ->", error);
    } else {
      console.log("Delete result -> ", result);
      let message = "Todo Removed";
      res.status(204).json({ message });
    }
  });
};

exports.deleteTodo = deleteTodo;
