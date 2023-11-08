const Joi = require("joi");

const userClassroomSchema = Joi.object({
  USER_CLASSROOM_ID: Joi.number().integer().min(1).optional().allow(null),
  USER_ID: Joi.number().integer().min(1).required(),
  CLASSROOM_ID: Joi.number().integer().min(1).required(),
});

module.exports = userClassroomSchema;
