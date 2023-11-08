const Joi = require("joi");

const systemSchema = Joi.object({
  OBJECT_ID: Joi.number().integer().min(1).optional().allow(null),
  STATUS: Joi.string()
    .valid("active", "inactive", "pending", "deleted")
    .required(),
});

module.exports = systemSchema;
