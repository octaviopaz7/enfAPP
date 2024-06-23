const express = require('express');
const Habitacion = require('../models/Habitacion');
const Paciente = require('../models/paciente');

const router = express.Router();

// GET - Obtener todas las habitaciones con sus pacientes asociados
router.get('/', async (req, res) => {
  try {
    // Consulta para obtener todas las habitaciones con los pacientes poblados
    const habitaciones = await Habitacion.find().populate('paciente');
    res.json(habitaciones);
  } catch (error) {
    console.error('Error al obtener las habitaciones con pacientes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// GET /api/habitaciones/:numero/:cama
router.get('/:numero/:cama', async (req, res) => {
  const { numero, cama } = req.params;
  try {
    const habitacion = await Habitacion.findOne({  numero: Number(numero), cama }).populate('paciente');

    if (!habitacion) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }

    res.json(habitacion); // Devuelve los datos de la habitación encontrada
  } catch (error) {
    console.error('Error al obtener la habitación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /api/habitaciones - Crear una nueva habitación
router.post('/', async (req, res) => {
  const { numero, cama, estado, pacienteDni } = req.body;
  
  try {
    // Crear una nueva instancia de Habitacion
    const nuevaHabitacion = new Habitacion({
      numero,
      cama,
      estado,
      pacienteDni
    });

    // Guardar la nueva habitación en la base de datos
    const habitacionGuardada = await nuevaHabitacion.save();
    res.status(201).json(habitacionGuardada); // Devolver la habitación creada
  } catch (error) {
    console.error('Error al crear la habitación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// DELETE /api/habitaciones/:numero/:cama - Eliminar habitación y paciente asociado
router.delete('/:numero/:cama', async (req, res) => {
  const { numero, cama } = req.params;

  try {
    const habitacion = await Habitacion.findOneAndDelete({ numero: Number(numero), cama });

    if (!habitacion) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }

    // Eliminar el paciente asociado si existe
    if (habitacion.pacienteDni) {
      await Paciente.findOneAndDelete({ dni: habitacion.pacienteDni });
    }

    res.status(200).json({ message: 'Habitación y paciente eliminados' });
  } catch (error) {
    console.error('Error al eliminar la habitación y el paciente:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


module.exports = router;