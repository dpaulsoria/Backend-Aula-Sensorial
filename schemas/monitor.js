const Joi = require("joi");

const monitorSchema = Joi.object({
  MONITOR_ID: Joi.number().integer().min(1).optional().allow(null),
  USER_CLASSROOM_ACCESS_ID: Joi.number().integer().min(1).required(),
  LOGIN_TIME: Joi.date().optional(),
  LOGOUT_TIME: Joi.date()
    .greater(Joi.ref("LOGIN_TIME")) // Descomentar si se requiere que LOGOUT_TIME sea posterior a LOGIN_TIME
    .optional(),
});

module.exports = monitorSchema;