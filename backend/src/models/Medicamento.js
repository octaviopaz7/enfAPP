const mongoose = require('mongoose');

const medicamentoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  accion_terapeutica: {
    type: String,
    required: true
  },
  efectos_secundarios: {
    type: String
  },
  contraindicaciones: {
    type: String
  },
  indicaciones: {
    type: String
  }
});

module.exports = mongoose.model('Medicamento', medicamentoSchema);
