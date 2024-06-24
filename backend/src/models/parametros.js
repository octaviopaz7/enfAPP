const mongoose = require('mongoose');

const parametrosSchema = new mongoose.Schema({
  dniPaciente: { type: String},
  pas: { type: Number, min: 90, max: 120 }, // P.A. Sistólica
  pad: { type: Number, min: 40, max: 90 },  // P.A. Diastólica
  fc: { type: Number, min: 60, max: 100 },  // Frecuencia Cardíaca
  fr: { type: Number, min: 12, max: 20 },   // Frecuencia Respiratoria
  temp: { type: Number, min: 35.5, max: 37.4 }, // Temperatura
  peso: { type: Number, min: 1, max: 200 },  // Peso
  talla: { type: Number, min: 20, max: 250 }, // Talla
  spo2: { type: Number, min: 95, max: 100 }, // Saturación de Oxígeno
  glucometria: { type: Number, min: 50, max: 110 }, // Glucometría
  HemoglucotestPreprandial: { type: Number, min: 70, max: 110 }, // Hemoglobina Preprandial
  HemoglucotestPostprandial: { type: Number, min: 70, max: 140 } // Hemoglobina Postprandial
});

module.exports = mongoose.model('Parametros', parametrosSchema);
