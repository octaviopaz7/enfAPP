import React from 'react';
import { Grid, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useHabitaciones } from '../components/hooks/HabitacionesContext';

const Pisos = () => {
  const navigate = useNavigate();
  const { estadoHabitaciones } = useHabitaciones();

  const verificarOcupacion = (numero, cama) => {
    const habitacion = estadoHabitaciones.find(h => h.numero === numero && h.cama === cama);
    return habitacion && habitacion.estado === 'ocupada';
  };

  const handleClick = (numero, cama) => {
    if (verificarOcupacion(numero, cama)) {
      navigate(`/habitaciones/${numero}/${cama}`);
    } else {
      navigate('/paciente-form', { state: { numero, cama } });
    }
  };

  const renderHabitaciones = () => {
    return [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314].map(numero => {
      const habitacionA = estadoHabitaciones.find(h => h.numero === numero && h.cama === 'A');
      const habitacionB = estadoHabitaciones.find(h => h.numero === numero && h.cama === 'B');

      const colorA = habitacionA && habitacionA.estado === 'ocupada' ? 'red' : 'green';
      const colorB = habitacionB && habitacionB.estado === 'ocupada' ? 'red' : 'green';

      return (
        <Grid item key={numero} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Container maxWidth="sm" style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: colorA, color: 'white', width: '100%', height: '40px' }}
                  onClick={() => handleClick(numero, 'A')}
                >
                  {`${numero} A`}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: colorB, color: 'white', width: '100%', height: '40px' }}
                  onClick={() => handleClick(numero, 'B')}
                >
                  {`${numero} B`}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      );
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {renderHabitaciones()}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Pisos;


