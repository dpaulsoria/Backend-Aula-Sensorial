const Joi = require("joi");

const userSchema = Joi.object({
  USER_ID: Joi.number().integer().min(1).optional().allow(null),
  USER: Joi.string().alphanum().min(3).max(30).required(),
  PASSWORD: Joi.string().min(16).max(64).required(),
  NAME: Joi.string().max(100).required(),
  LASTNAME: Joi.string().max(100).required(),
});

module.exports = userSchema;
