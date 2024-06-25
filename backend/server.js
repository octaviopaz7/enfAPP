// src/index.js (o donde configures Express)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/database'); // Ajusta la ruta según tu estructura
const medicamentosRoutes = require('./src/routes/medicamentos');
const habitacionesRoutes = require('./src/routes/habitaciones');
const usuariosRoutes = require('./src/routes/usuarios');
const pacientesRoutes = require('./src/routes/pacienteRoutes');
const parametrosRoutes = require('./src/routes/parametros'); // Cambia el nombre de la variable según el archivo

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB(); // Asegúrate de que esta función se conecte correctamente a tu base de datos

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/medicamentos', medicamentosRoutes);
app.use('/api/habitaciones', habitacionesRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/parametros', parametrosRoutes); // Usa la variable `parametrosRoutes` que importa `parametros.js`

// Servir archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Redirigir todas las demás solicitudes al index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
