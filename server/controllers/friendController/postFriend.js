const mysql = require("mysql2");
require("dotenv").config();
const { friendSchema } = require("../../model/friendSchema");

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const postFriend = async function postFriend(req, res) {
  let user_id = req.loggedInUser.user_id;

  let validation = friendSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const { username } = req.body;
  const sqlFindPerson = `
          SELECT user_id, username 
          FROM users 
          WHERE username = ?;
        `;

  const sqlCheckPerson = `
          SELECT user_id, friend_name 
          FROM friends 
          WHERE user_id = ? 
          AND friend_name = ?;
        `;

  const sqlAddFriend = `
          INSERT INTO friends(user_id, friend_name) 
          VALUES(?, ?)
        `;

  findFriend(sqlFindPerson, username);

  function findFriend(sqlFindPerson, username) {
    pool.execute(sqlFindPerson, [username], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      if (result.length < 1) {
        res.status(404).json({ message: "User Not Found" });
        return;
      }
      checkFriends(sqlCheckPerson, user_id, username);
    });
  }

  function checkFriends(sqlCheckPerson, user_id, username) {
    pool.execute(sqlCheckPerson, [user_id, username], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      if (result.length > 0) {
        res.status(404).json({ message: "Already Friends!" });
        return;
      }
      addFriend(sqlAddFriend, user_id, username);
    });
  }

  function addFriend(sqlAddFriend, user_id, username) {
    pool.execute(sqlAddFriend, [user_id, username], (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        console.log("Friend Add res ->", result);
        res.status(200).json({ message: "New Friend Added!" });
        return;
      }
    });
  }
};

exports.postFriend = postFriend;
