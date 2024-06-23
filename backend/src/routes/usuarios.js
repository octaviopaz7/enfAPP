const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// POST /api/usuarios/register
router.post('/register', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ usuario });
    if (usuarioExiste) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    const nuevoUsuario = new Usuario({ usuario, contraseña });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});


// POST /api/usuarios/login
router.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ usuario });
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    if (contraseña !== usuarioExistente.contraseña) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si la autenticación es exitosa, enviar una respuesta
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


router.post('/change-password', async (req, res) => {
  const { usuario, oldPassword, newPassword } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (oldPassword !== usuarioEncontrado.contraseña) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    usuarioEncontrado.contraseña = newPassword;
    await usuarioEncontrado.save();
    res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error.message);
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
});

module.exports = router;