const Joi = require("joi");

const classroomSchema = Joi.object({
  CLASSROOM_ID: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow(null),
  NAME: Joi.string()
    .min(3) // Asumiendo que se requiere al menos 3 caracteres
    .max(255) // Asumiendo un límite de longitud estándar para campos de texto en SQL
    .required(),
  DESCRIPTION: Joi.string()
    .max(255) // Asumiendo un límite de longitud estándar para campos de texto en SQL
    .allow("", null) // Permite una cadena vacía o nulo
    .optional(),
});

module.exports = classroomSchema;
