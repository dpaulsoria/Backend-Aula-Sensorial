const Joi = require("joi");

const accessSchema = Joi.object({
  ACCESS_ID: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow(null),
  ACCESS_DESCRIPTION: Joi.string()
    .max(255) // Asumiendo un límite de longitud estándar para campos de texto en SQL
    .allow("", null) // Permite una cadena vacía o nulo
    .optional(),
  OBJECT_ID: Joi.number()
    .integer()
    .min(1)
    .required(),
});

module.exports = accessSchema;
