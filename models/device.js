const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["screen", "light", "speaker"], // Enum para especificar el tipo de dispositivo
  },
  isActive: {
    type: Boolean,
    default: false, // Estado de encendido/apagado
  },
  identifier: {
    type: String,
    required: true, // identificador del dispositivo
    unique: true
  },
  // Propiedades específicas para cada tipo de dispositivo
  details: {
    song: { type: String }, // Canción que está sonando en el parlante
    volumeLevel: { type: Number }, // Nivel de volumen del parlante
    color: { type: String }, // Color de la luz
    intensity: { type: Number }, // Intensidad de la luz
    video: { type: String }, // Video que se reproduce en la pantalla
  },
});

module.exports = mongoose.model("Device", DeviceSchema);
