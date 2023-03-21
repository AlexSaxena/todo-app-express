const joi = require("joi");

const friendSchema = joi.object({
  username: joi.string().min(4).max(100).required(),
});

exports.friendSchema = friendSchema;
