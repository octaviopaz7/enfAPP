import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../backend/src/routes/api';
import PacienteForm from './PacienteForm';
import { Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Delete , Edit  } from '@mui/icons-material';
import { useHabitaciones } from './hooks/HabitacionesContext';

const Habitacion = () => {
  const navigate = useNavigate();
  const { numero, cama } = useParams(); // Obtener numero y cama desde los parámetros de la URL
  const [habitacion, setHabitacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paciente, setPaciente] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { obtenerEstadoHabitaciones } = useHabitaciones();

  const handleEliminarPaciente = async () => {
    try {
      await api.delete(`/habitaciones/${numero}/${cama}`);
      alert('Paciente y habitación eliminados');
      obtenerEstadoHabitaciones(); // Actualiza el estado de las habitaciones
      navigate('/pisos');
    } catch (error) {
      console.error('Error al eliminar el paciente y la habitación:', error);
      alert('Error al eliminar el paciente y la habitación');
    }
  };

  const handleEditarPaciente = () => {
    setEditMode(true);
  };

  const handleGuardarEdicion = async () => {
    try {
      setEditMode(false);
      fetchHabitacion(numero, cama); // Actualiza el estado después de la edición
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
    }
  };

  const fetchHabitacion = async (numero, cama) => {
    try {
      const response = await api.get(`/habitaciones/${numero}/${cama}`);
      setHabitacion(response.data);

      if (response.data.estado === 'ocupada') {
        const pacienteResponse = await api.get(`/pacientes/${response.data.pacienteDni}`);
        setPaciente(pacienteResponse.data);
      }
    } catch (error) {
      console.error('Error al obtener la habitación con paciente:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (numero && cama) {
      fetchHabitacion(numero, cama);
    }
  }, [numero, cama]);

  if (loading) {
    return <p>Cargando datos de la habitación...</p>;
  }

  if (!habitacion) {
    return <p>No se encontró la habitación solicitada</p>;
  }

  return (
    <>
      {!editMode && (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h4" component="div" align="center" marginBottom={0} gutterBottom>
              Habitación {numero} - Cama {cama}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Estado: {habitacion.estado}
            </Typography>
            <Typography variant="h5" component="div" align="center" gutterBottom>
              Datos del Paciente
            </Typography>
            <Typography align="center">Nombre: {paciente.nombre} {paciente.apellido}</Typography>
            <Typography align="center">DNI: {paciente.dni}</Typography>
            <Typography align="center">Edad: {paciente.edad}</Typography>
            <Typography align="center">Dieta: {paciente.dieta}</Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Button onClick={handleEditarPaciente} variant="contained" color="primary" endIcon={<Edit/>}>
                  Editar paciente
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleEliminarPaciente} variant="outlined" endIcon={<Delete/>}>
                  Eliminar paciente
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Container>
      )}

      {editMode && (
        <Container  maxWidth="md"  sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" align="center" marginBottom={-2} gutterBottom>
              Habitación {numero} - Cama {cama}
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={6} lg={12}>
                <PacienteForm paciente={paciente} onSave={handleGuardarEdicion} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Container>
      )}
    </>
  );
};

export default Habitacion;
