const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/database');
const medicamentosRoutes = require('./src/routes/medicamentos');
const habitacionesRoutes = require('./src/routes/habitaciones');
const usuariosRoutes = require('./src/routes/usuarios');
const pacientesRoutes = require('./src/routes/pacienteRoutes');
const parametrosSchema =require('./src/routes/parametros')

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB(); 

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/medicamentos', medicamentosRoutes);
app.use('/api/habitaciones', habitacionesRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/parametros',parametrosSchema)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
