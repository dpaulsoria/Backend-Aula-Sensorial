const Joi = require("joi");

const soundColorSchema = Joi.object({
  OBJECT_ID: Joi.number().integer().min(1).optional().allow(null),
  COLOR: Joi.string().valid("red", "green", "blue").optional(),
  SOUND: Joi.string().valid("high", "medium", "low").optional(),
  STATUS: Joi.string()
    .valid("active", "inactive", "pending", "deleted")
    .optional(),
});

module.exports = soundColorSchema;