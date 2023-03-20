const express = require("express");
const { getFriend } = require("../controllers/friendController/getFriend");
const { postFriend } = require("../controllers/friendController/postFriend");

const friendRoutes = express.Router();

friendRoutes.get("/", getFriend);
friendRoutes.post("/", postFriend);

exports.friendRoutes = friendRoutes;
