import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../backend/src/routes/api';
import PacienteForm from '../pacienteForm/PacienteForm';
import { Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useHabitaciones } from '../hooks/HabitacionesContext';
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
      const response = await api.get(`/paciente/${nombre}/${dni}`);
      setNombrePaciente(response.data.nombre);
      setApellidoPaciente(response.data.apellido);
    } catch (error) {
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
        }}>
          <CardContent sx={{
            maxWidth: 700,
            borderRadius: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 1)',
            padding: '20px', // Añadir relleno
          }}>
            <Typography variant="h4" component="div" align="center" marginBottom={2} gutterBottom>
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
                <Button onClick={handleVerParametros} variant="contained" color="primary">
                  Ver Parámetros
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleEditarPaciente} variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white', borderColor: '#4CAF50' }} endIcon={<Edit />}>
                  Editar paciente
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleEliminarPaciente} variant="contained" style={{ backgroundColor: '#F44336', color: 'white', borderColor: '#F44336' }} endIcon={<Delete />}>
                  Eliminar paciente
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </div>

      )}

      {editMode && (
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="h4"
              component="div"
              align="center"
              style={{
                maxWidth: 'fit-content',
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 4,
              }}>
              Habitación {numero} - Cama {cama}
            </Typography>
          </div>
          <PacienteForm paciente={paciente} onSave={handleGuardarEdicion} />
        </CardContent>
      )}
    </>
  );
};

export default Habitacion;
