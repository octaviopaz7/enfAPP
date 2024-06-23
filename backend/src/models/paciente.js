const mongoose = require('mongoose');
const Habitacion = require('./Habitacion');

const PacienteSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  dieta: { type: String, required: true },
  cama: { type: String },
}, { versionKey: false });

module.exports = mongoose.model('Paciente', PacienteSchema);
