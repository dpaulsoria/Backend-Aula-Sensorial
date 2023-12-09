const Joi = require("joi");

const fileSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9-_\\. :]+$"))
    .message("Nombre de archivo inválido"),

  size: Joi.number()
    .required()
    .max(1073741824) // Por ejemplo, un límite máximo de 10MB
    .message("Tamaño de archivo excede el límite permitido"),

  mimeType: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9-\\/+]+$"))
    .message("Tipo MIME de archivo inválido"),

  userId: Joi.number()
    .integer()
    .min(1)
    .message("Identificador de usuario inválido"),
});

module.exports = fileSchema;
