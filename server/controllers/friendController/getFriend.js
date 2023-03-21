const mysql = require("mysql2");
require("dotenv").config();

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const getFriend = function getFriend(req, res) {
  console.log("getFriend-req.loggedInUser ->", req.loggedInUser);
  let user_id = req.loggedInUser.user_id;

  const sqlTodos = `
    select users.username, users.user_id, todos.todo from users
    inner join
      todos on users.user_id = todos.user_id
    where 
      users.username in (select friend_name from friends where user_id=?);
`;

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
};

exports.getFriend = getFriend;
