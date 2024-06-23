import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {useHabitaciones} from './hooks/HabitacionesContext'
import api from '../../../backend/src/routes/api'; // Importa la instancia de Axios configurada

const PacienteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { numero, cama } = location.state || {}; // Obtener numero y cama desde el estado de la navegación
  const { obtenerEstadoHabitaciones } = useHabitaciones();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [edad, setEdad] = useState('');
  const [dieta, setDieta] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('http://localhost:5000/api/pacientes', {
        dni,
        nombre,
        apellido,
        edad: parseInt(edad), 
        dieta,
        cama,
        habitaciones: numero 
      });

      const pacienteDni = response.data.dni; // Obtener el DNI del paciente creado

      const responseHabitacion = await api.post('http://localhost:5000/api/habitaciones', {
        numero,
        estado: 'ocupada', // Por defecto se asigna como ocupada al crear el paciente
        cama,
        pacienteDni : pacienteDni
      });


      alert('Paciente enviado correctamente');
      setDni('');
      setNombre('');
      setApellido('');
      setEdad('');
      setDieta('');

      obtenerEstadoHabitaciones(); // Actualiza el estado de las habitaciones
      navigate(`/habitaciones/${numero}/${cama}`);
    } catch (error) {
      alert('Error al enviar paciente. Inténtalo de nuevo.');
      console.error('Error:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Enviar Paciente
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
                    type="number" // Asegúrate de que el campo de edad sea numérico
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
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={!dni || !nombre || !apellido || !edad || !dieta}
                  >
                    Enviar Paciente
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PacienteForm;

/*
const PacienteForm = ({ paciente = {}, onSave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { numero, cama } = location.state || {}; // Obtener numero y cama desde el estado de la navegación o props
  const { obtenerEstadoHabitaciones } = useHabitaciones();

  const [nombre, setNombre] = useState(paciente.nombre || '');
  const [apellido, setApellido] = useState(paciente.apellido || '');
  const [dni, setDni] = useState(paciente.dni || '');
  const [edad, setEdad] = useState(paciente.edad || '');
  const [dieta, setDieta] = useState(paciente.dieta || '');

  useEffect(() => {
    if (paciente) {
      setNombre(paciente.nombre);
      setApellido(paciente.apellido);
      setDni(paciente.dni);
      setEdad(paciente.edad);
      setDieta(paciente.dieta);
    }
  }, [paciente]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        alert('Paciente actualizado correctamente');
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

        alert('Paciente enviado correctamente');
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
      navigate(`/habitaciones/${numero}/${cama}`);
    } catch (error) {
      alert('Error al enviar o actualizar el paciente. Inténtalo de nuevo.');
      console.error('Error:', error);
    }
  }; */ 