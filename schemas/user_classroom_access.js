const Joi = require("joi");

const userClassroomAccessSchema = Joi.object({
  USER_CLASSROOM_ACCESS_ID: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow(null),
  USER_CLASSROOM_ID: Joi.number().integer().min(1).required(),
  ACCESS_ID: Joi.number().integer().min(1).required(),
});

module.exports = userClassroomAccessSchema;
