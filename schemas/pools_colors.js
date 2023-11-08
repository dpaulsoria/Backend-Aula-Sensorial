const Joi = require("joi");

const poolsColorsSchema = Joi.object({
  OBJECT_ID: Joi.number().integer().min(1).optional().allow(null),
  STATUS: Joi.string()
    .valid("active", "inactive", "pending", "deleted")
    .optional(),
  COLOR: Joi.string().valid("red", "green", "blue").optional(),
});

module.exports = poolsColorsSchema;
