import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../backend/src/routes/api';
import PacienteForm from './PacienteForm';
import { Button } from '@mui/material';
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
    <div className="container">
      <div className="header">
        <h1> Habitación {numero} - Cama {cama}</h1>
      </div>
      <div className="details">
        <p>Estado: {habitacion.estado}</p>
      </div>
      {habitacion.estado === 'ocupada' ? (
        <div className="paciente">
          <h2>Datos del Paciente</h2>
          {editMode ? (
            <PacienteForm paciente={paciente} onSave={handleGuardarEdicion} />
          ) : (
            <>
              <p>Nombre: {paciente.nombre} {paciente.apellido}</p>
              <p>DNI: {paciente.dni}</p>
              <p>Edad: {paciente.edad}</p>
              <p>Dieta: {paciente.dieta}</p>
              <Button onClick={handleEditarPaciente} variant="contained" color="primary">Editar paciente</Button>
              <Button onClick={handleEliminarPaciente} variant="contained" color="secondary">Eliminar paciente</Button>
            </>
          )}
        </div>
      ) : (
        <PacienteForm onSave={handleGuardarEdicion} />
      )}
    </div>
  );
};

export default Habitacion;
