import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../../../backend/src/routes/api'; // Importa la instancia de Axios configurada

const FormRegistro = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');
  const [errorConfirmarContraseña, setErrorConfirmarContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
      setErrorConfirmarContraseña('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await api.post('/usuarios/register', { usuario, contraseña });
      console.log(response.data);
      
      Swal.fire({
        icon: 'success',
        title: `¡Usuario ${usuario} registrado!`,
        text: 'Registro exitoso',
      });

      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      if (error.response) {
        const { error: errorMessage } = error.response.data;
        if (errorMessage === 'El nombre de usuario ya existe') {
          setErrorUsuario('El nombre de usuario ya está en uso');
          setErrorContraseña('');
          setErrorConfirmarContraseña('');
        } else {
          setErrorUsuario('Error al registrar usuario');
          setErrorContraseña('');
          setErrorConfirmarContraseña('');
        }
      } else {
        setErrorUsuario('Error de red');
        setErrorContraseña('');
        setErrorConfirmarContraseña('');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: '85vh', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 1)', 
          padding: '20px',
          borderRadius: '8px'
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
            autoComplete="new-contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            error={!!errorContraseña}
            helperText={errorContraseña}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmarContraseña"
            label="Confirmar Contraseña"
            type="password"
            id="confirmarContraseña"
            autoComplete="new-contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            error={!!errorConfirmarContraseña}
            helperText={errorConfirmarContraseña}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate('/login')} variant="body2" style={{ cursor: 'pointer' }}>
                ¿Ya tienes una cuenta? Accede Aquí
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default FormRegistro;
