const express = require('express');
const Paciente = require('../models/paciente');
const Habitacion = require('../models/Habitacion');

const router = express.Router();

// GET - Obtener todos los pacientes
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los pacientes' });
  }
});

// GET - Obtener paciente por DNI
router.get('/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    const paciente = await Paciente.findOne({ dni });
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    console.error('Error al obtener el paciente:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// POST - Crear un nuevo paciente
router.post('/', async (req, res) => {
  const { dni, nombre, apellido, edad, dieta, cama, habitaciones } = req.body;

  if (!dni || !nombre || !apellido || !edad || !dieta || !cama || !habitaciones) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoPaciente = new Paciente({
      dni,
      nombre,
      apellido,
      edad,
      dieta,
      cama,
    });

    await nuevoPaciente.save();

    // Actualiza el estado de la habitación a ocupada
    await Habitacion.findOneAndUpdate(
      { numero: habitaciones, cama },
      { estado: 'ocupada', pacienteDni: nuevoPaciente.dni }
    );

    res.status(201).json(nuevoPaciente);
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el paciente' });
  }
});


// Actualizar paciente por DNI
router.put('/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    const updatedPaciente = await Paciente.findOneAndUpdate({ dni }, req.body, { new: true });
    if (!updatedPaciente) {
      return res.status(404).send({ message: 'Paciente no encontrado' });
    }
    res.send(updatedPaciente);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/paciente/nombre/:dni', async (req, res) => {
  try {
    const paciente = await Paciente.findOne({ dni: req.params.dni }, 'nombre apellido');
    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
