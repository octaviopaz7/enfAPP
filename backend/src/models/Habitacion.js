const mongoose = require('mongoose');
const paciente = require('./paciente')

const habitacionsSchema = new mongoose.Schema({
  numero: Number,
  estado: { type: String, enum: ['ocupada', 'libre'], default: 'libre' },
  cama: { type: String, enum: ['A', 'B'], required: true },
  paciente: { type: String, ref: 'Paciente' },
  pacienteDni: {type: String, required: true}
}, { versionKey: false });

module.exports = mongoose.model('Habitacion', habitacionsSchema);
