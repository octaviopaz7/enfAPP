// src/routes/parametros.js
const express = require('express');
const router = express.Router();
const parametrosSchema = require('../models/parametros');

router.get('/:dni', async (req, res) => {
  try {
    const parametros = await parametrosSchema.findOne({ dniPaciente: req.params.dni });
    if (!parametros) {
      return res.status(404).json({ message: 'Parámetros no encontrados' });
    }
    res.json(parametros);
  } catch (err) {
    console.error('Error en GET /:dni:', err);
    res.status(500).json({ message: err.message });
  }
});

router.put('/', async (req, res) => {
  const { dniPaciente, ...parametros } = req.body;

  try {
    const parametrosExistentes = await parametrosSchema.findOne({ dniPaciente });

    if (parametrosExistentes) {
      Object.assign(parametrosExistentes, parametros);
      await parametrosExistentes.save();
      return res.json(parametrosExistentes);
    } else {
      const nuevosParametros = new ParametrosClinicos(req.body);
      await nuevosParametros.save();
      res.json(nuevosParametros);
    }
  } catch (err) {
    console.error('Error en PUT /parametros:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
