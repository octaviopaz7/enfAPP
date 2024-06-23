import { useState } from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import api from '../../../backend/src/routes/api'; // Asegúrate de importar correctamente la instancia de Axios configurada
import { useNavigate } from 'react-router-dom';

const CambiarContraseña = () => {
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (event) => {
    event.preventDefault();

    // Validar que la nueva contraseña no sea igual a la contraseña actual
    if (contraseñaActual === nuevaContraseña) {
      setError('La nueva contraseña debe ser distinta a la actual.');
      return;
    }

    // Validar que las contraseñas nuevas coincidan
    if (nuevaContraseña !== confirmarNuevaContraseña) {
      setError('Las contraseñas nuevas no coinciden.');
      return;
    }

    try {
      const usuario = localStorage.getItem('usuario'); 
      const response = await api.post('/usuarios/change-password', {
        usuario,
        oldPassword: contraseñaActual,
        newPassword: nuevaContraseña,
      });
      alert(response.data.message);
      navigate('/pisos'); // Redirigir a otra página después de cambiar la contraseña
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      setError('La contraseña actual es incorrecta.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Cambiar Contraseña
        </Typography>
        <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="contraseñaActual"
            label="Contraseña Actual"
            type="password"
            autoComplete="current-password"
            value={contraseñaActual}
            onChange={(e) => setContraseñaActual(e.target.value)}
            error={error !== ''} // Aplicar error si hay un mensaje de error
            helperText={error !== '' ? error : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="nuevaContraseña"
            label="Nueva Contraseña"
            type="password"
            autoComplete="new-password"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmarNuevaContraseña"
            label="Confirmar Nueva Contraseña"
            type="password"
            autoComplete="new-password"
            value={confirmarNuevaContraseña}
            onChange={(e) => setConfirmarNuevaContraseña(e.target.value)}
            error={confirmarNuevaContraseña !== '' && nuevaContraseña !== confirmarNuevaContraseña}
            helperText={
              confirmarNuevaContraseña !== '' && nuevaContraseña !== confirmarNuevaContraseña
                ? 'Las contraseñas no coinciden.'  : ''
            }
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained">
              Cambiar Contraseña
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CambiarContraseña;
