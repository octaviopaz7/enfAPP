const mongoose = require('mongoose');

const parametrosSchema = new mongoose.Schema({
  dniPaciente: { type: String, required: true },
  pas: { type: Number },
  pad: { type: Number },
  fc: { type: Number },
  fr: { type: Number },
  temp: { type: Number },
  peso: { type: Number },
  talla: { type: Number },
  spo2: { type: Number },
  glucometria: { type: Number },
  HemoglucotestPreprandial: { type: Number },
  HemoglucotestPostprandial: { type: Number }
});

module.exports = mongoose.model('parametros', parametrosSchema);
