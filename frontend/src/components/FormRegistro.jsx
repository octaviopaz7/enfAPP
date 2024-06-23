import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../../backend/src/routes/api'; // Importa la instancia de Axios configurada

const FormRegistro = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/usuarios/register', { usuario, contraseña });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="usuario"
            label="Nombre de Usuario"
            name="usuario"
            autoComplete="usuario"
            autoFocus
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="contraseña"
            label="Contraseña"
            type="password"
            id="contraseña"
            autoComplete="new-contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormRegistro;