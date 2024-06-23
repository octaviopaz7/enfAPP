import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import api from '../../../backend/src/routes/api'; // Asegúrate de importar correctamente la instancia de Axios configurada
import { useNavigate } from 'react-router-dom';

const CambiarContraseña = () => {
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const usuario = localStorage.getItem('usuario'); // Suponiendo que el nombre de usuario está almacenado en el localStorage
      const response = await api.post('/usuarios/change-password', { usuario, oldPassword: contraseñaActual, newPassword: nuevaContraseña });
      alert(response.data.message);
      navigate('/pisos'); // Redirigir a otra página después de cambiar la contraseña
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      alert('Error al cambiar la contraseña');
    }
  };

  return (
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
      <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 1 }}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cambiar Contraseña
        </Button>
      </Box>
    </Box>
  );
};

export default CambiarContraseña;
