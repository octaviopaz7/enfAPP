const express = require('express');
const router = express.Router();
const parametrosSchema = require('../models/parametros');

// GET para obtener parámetros por DNI
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


// POST para crear nuevos parámetros o actualizar si existe el dniPaciente
router.post('/', async (req, res) => {
    const { dniPaciente, ...parametros } = req.body;
  
    try {
      let parametrosExistentes = await parametrosSchema.findOne({ dniPaciente });
  
      if (parametrosExistentes) {
        parametrosExistentes = await parametrosSchema.findOneAndUpdate({ dniPaciente }, parametros, { new: true });
        return res.json(parametrosExistentes);
      } else {
        const nuevosParametros = new parametrosSchema({ dniPaciente, ...parametros });
        await nuevosParametros.save();
        res.status(201).json(nuevosParametros);
      }
    } catch (err) {
      console.error('Error en POST /', err);
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
