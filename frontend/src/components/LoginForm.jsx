import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Link, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../../backend/src/routes/api'; // Importa la instancia de Axios configurada


const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { usuario, contraseña });
      console.log(response.data);
      alert('Inicio de sesión exitoso');

      // Guardar el nombre de usuario en el almacenamiento local
      localStorage.setItem('usuario', usuario);

      navigate('/pisos');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert('Error al iniciar sesión');
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
          Iniciar Sesión
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
            autoComplete="current-password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate('/register')} variant="body2" style={{ cursor: 'pointer' }}>
                {"¿No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
