import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Link, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../../backend/src/routes/api';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { usuario, contraseña });
      console.log(response.data);
      
      // Guardar el nombre de usuario en el almacenamiento local
      localStorage.setItem('usuario', usuario);

      Swal.fire({
        icon: 'success',
        title: `¡Bienvenido, ${usuario}!`,
        text: 'Inicio de sesión exitoso',
      });

      navigate('/pisos');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      if (error.response) {
        const { error: errorMessage } = error.response.data;
        if (errorMessage === 'Usuario no encontrado') {
          setErrorUsuario('Usuario no encontrado');
          setErrorContraseña('');
        } else if (errorMessage === 'Contraseña incorrecta') {
          setErrorContraseña('Contraseña incorrecta');
          setErrorUsuario('');
        } else {
          setErrorUsuario('Error de autenticación');
          setErrorContraseña('');
        }
      } else {
        setErrorUsuario('Error de red');
        setErrorContraseña('');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente blanco
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 1)', // Sombra suave
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
            error={!!errorUsuario}
            helperText={errorUsuario}
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
            error={!!errorContraseña}
            helperText={errorContraseña}
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
                ¿No tienes una cuenta? Regístrate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
