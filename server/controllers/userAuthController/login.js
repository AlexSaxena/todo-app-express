const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// MySql Configurations / Definitions
const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const login = function login(req, res) {
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
};

exports.login = login;
