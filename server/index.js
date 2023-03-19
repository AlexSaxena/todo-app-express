console.log("General Kenobi");

// Dependency pkts imports
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes & Middleware Imports
const { checkLoginToken } = require("./middlewares/checkLoginToken");
const { userAuthRoutes } = require("./routes/userAuthRoutes");
const { userTodoRoutes } = require("./routes/userTodosRoutes");

const app = express();

// Enables Cookies & JSON to be read
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);
app.use(cookieParser());

// Route -> /login & /register
app.use("/", userAuthRoutes);

// Routes -> Todos
app.use("/todos", checkLoginToken, userTodoRoutes);

// Server Port
app.listen(5050, () => {
  console.log(`\x1b[33m  Server running on http://localhost:5050 \x1b[0m`);
});
