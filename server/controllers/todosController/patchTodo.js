const mysql = require("mysql2");
require("dotenv").config();

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const patchTodo = function patchTodo(req, res) {
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
        console.log("Patch result -> ", result);
        res.status(200).send("Patch Completed!");
        return;
      }
    }
  );
};

exports.patchTodo = patchTodo;
