import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../backend/src/routes/api';
import PacienteForm from './PacienteForm';
import { Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useHabitaciones } from './hooks/HabitacionesContext';
import Swal from 'sweetalert2';

const Habitacion = () => {
  const navigate = useNavigate();
  const { numero, cama } = useParams();
  const [habitacion, setHabitacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paciente, setPaciente] = useState(null); // Aquí se almacenará el objeto completo del paciente
  const [nombrePaciente, setNombrePaciente] = useState(''); // Nombre del paciente
  const [apellidoPaciente, setApellidoPaciente] = useState(''); // Apellido del paciente
  const [editMode, setEditMode] = useState(false);
  const { obtenerEstadoHabitaciones } = useHabitaciones();

  const handleEliminarPaciente = async () => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await api.delete(`/habitaciones/${numero}/${cama}`);
        Swal.fire({
          title: '¡Eliminado!',
          text: 'Paciente y habitación eliminados',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        obtenerEstadoHabitaciones();
        navigate('/pisos');
      }
    } catch (error) {
      console.error('Error al eliminar el paciente y la habitación:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al eliminar el paciente y la habitación',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleEditarPaciente = () => {
    setEditMode(true);
  };

  const handleGuardarEdicion = async () => {
    try {
      setEditMode(false);
      fetchHabitacion(numero, cama);
      Swal.fire({
        title: '¡Actualizado!',
        text: 'Los datos del paciente han sido actualizados',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al actualizar el paciente',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const fetchHabitacion = async (numero, cama) => {
    try {
      const response = await api.get(`/habitaciones/${numero}/${cama}`);
      setHabitacion(response.data);

      if (response.data.estado === 'ocupada') {
        // Obtener datos completos del paciente
        const pacienteResponse = await api.get(`/pacientes/${response.data.pacienteDni}`);
        setPaciente(pacienteResponse.data);

        // Extraer nombre y apellido del paciente
        setNombrePaciente(pacienteResponse.data.nombre);
        setApellidoPaciente(pacienteResponse.data.apellido);
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

  useEffect(() => {
    if (habitacion && habitacion.pacienteDni) {
      fetchNombrePaciente(habitacion.pacienteDni);
    }
  }, [habitacion]);

  const fetchNombrePaciente = async (dni) => {
    try {
      const response = await api.get(`/pacientes/nombre/${dni}`);
      setNombrePaciente(response.data.nombre);
      setApellidoPaciente(response.data.apellido);
    } catch (error) {
      console.error('Error al obtener el nombre del paciente:', error);
    }
  };

  const handleVerParametros = () => {
    navigate(`/habitacion/${numero}/${cama}/parametros`);
  };

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
              <Typography align="center">Nombre: {nombrePaciente} {apellidoPaciente}</Typography>
              <Typography align="center">DNI: {habitacion.pacienteDni}</Typography>
              <Typography align="center">Edad: {paciente ? paciente.edad : 'Cargando...'}</Typography>
              <Typography align="center">Dieta: {paciente ? paciente.dieta : 'Cargando...'}</Typography>
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Button onClick={handleEditarPaciente} variant="contained" color="primary" endIcon={<Edit />}>
                    Editar paciente
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleEliminarPaciente} variant="outlined" endIcon={<Delete />}>
                    Eliminar paciente
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleVerParametros} variant="contained" color="primary">
                    Ver Parámetros
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      )}

      {editMode && (
        <Container maxWidth="md" sx={{ mt: 4 }}>
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
