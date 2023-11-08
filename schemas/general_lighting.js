const Joi = require("joi");

const generalLightingSchema = Joi.object({
  OBJECT_ID: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow(null),
  STATUS: Joi.string()
    .valid("active", "inactive", "pending", "deleter")
    .optional(),
});

module.exports = generalLightingSchema ;
