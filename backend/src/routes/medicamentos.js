const express = require('express');
const router = express.Router();
const Medicamento = require('../models/Medicamento');

// GET /api/medicamentos
// Obtener todos los medicamentos
router.get('/', async (req, res) => {
  try {
    const medicamentos = await Medicamento.find();
    res.json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos:', error.message);
    res.status(500).json({ error: 'Error al obtener medicamentos' });
  }
});

// GET /api/medicamentos/search

router.get('/search', async (req, res) => {
  const { nombre } = req.query;

  try {
    // Realizar la búsqueda por nombre
    const medicamentos = await Medicamento.find({
      nombre: { $regex: new RegExp(nombre, 'i') } // Buscar el nombre que contenga el texto, sin distinguir mayúsculas y minúsculas
    });

    res.json(medicamentos);
  } catch (error) {
    console.error('Error al buscar medicamentos:', error.message);
    res.status(500).json({ error: 'Error al buscar medicamentos' });
  }
});

module.exports = router;
