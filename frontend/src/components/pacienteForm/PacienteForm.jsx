import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHabitaciones } from '../hooks/HabitacionesContext';
import api from '../../../../backend/src/routes/api'; // Importa la instancia de Axios configurada
import Swal from 'sweetalert2';


const PacienteForm = ({ paciente = {}, onSave }) => { // Añadir numero y cama como props
  const navigate = useNavigate();
  const location = useLocation();
  const { numero, cama } = location.state || {}; // Obtener numero y cama desde el estado de la navegación
  const { obtenerEstadoHabitaciones } = useHabitaciones();
  const [nombre, setNombre] = useState(paciente.nombre || '');
  const [apellido, setApellido] = useState(paciente.apellido || '');
  const [dni, setDni] = useState(paciente.dni || '');
  const [edad, setEdad] = useState(paciente.edad || '');
  const [dieta, setDieta] = useState(paciente.dieta || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (paciente && paciente.dni) {
      setNombre(paciente.nombre);
      setApellido(paciente.apellido);
      setDni(paciente.dni);
      setEdad(paciente.edad);
      setDieta(paciente.dieta);
    }
  }, [paciente]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    //Validaciones
    if (dni.length < 8 || dni.length > 11) {
      setError('El DNI debe tener entre 8 y 11 caracteres.');
      return;
    }

    if (parseInt(edad) < 0 || parseInt(edad) > 120) {
      setError('La edad debe estar entre 0 y 120 años.');
      return;
    }


    const pacienteData = {
      dni,
      nombre,
      apellido,
      edad: parseInt(edad),
      dieta,
      cama,
      habitaciones: numero,
    };


    try {
      if (paciente && paciente.dni) {
        // Si el paciente existe, actualiza el paciente
        await api.put(`http://localhost:5000/api/pacientes/${paciente.dni}`, pacienteData);
        if (onSave) {
          onSave(pacienteData);
        }
      } else {
        // Si el paciente no existe, crea un nuevo paciente
        const response = await api.post('http://localhost:5000/api/pacientes', pacienteData);
        const pacienteDni = response.data.dni; // Obtener el DNI del paciente creado

        await api.post('http://localhost:5000/api/habitaciones', {
          numero,
          estado: 'ocupada', // Por defecto se asigna como ocupada al crear el paciente
          cama,
          pacienteDni: pacienteDni,
        });

        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: `Paciente ingresado correctamente a la habitación ${numero}, cama ${cama}`,
        });
        navigate(`/habitaciones/${numero}/${cama}`);
        if (onSave) {
          onSave(pacienteData);
        }
      }

      setDni('');
      setNombre('');
      setApellido('');
      setEdad('');
      setDieta('');

      obtenerEstadoHabitaciones(); // Actualiza el estado de las habitaciones
    } catch (error) {
      setError("El DNI ingresado ya existe!")
    }
  };

  return (
    <Card variant="outlined"
      style={{
        maxWidth: 400,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
        margin: 'auto', marginTop: 50
      }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom align="center">
          {paciente && paciente.dni ? 'Editar Paciente' : 'Enviar Paciente'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                fullWidth
                disabled={!!paciente.dni}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Edad"
                type="number"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Dieta"
                value={dieta}
                onChange={(e) => setDieta(e.target.value)}
                fullWidth
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
                disabled={!dni || !nombre || !apellido || !edad || !dieta}
                style={{ margin: 'auto' }}
              >
                {paciente && paciente.dni ? 'Guardar Cambios' : 'Enviar Paciente'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PacienteForm;
