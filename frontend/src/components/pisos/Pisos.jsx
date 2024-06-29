import React, { useState } from 'react';
import { Grid, Button, Container, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useHabitaciones } from '../hooks/HabitacionesContext';

const Pisos = () => {
  const navigate = useNavigate();
  const { estadoHabitaciones } = useHabitaciones();

  const [pisoSeleccionado, setPisoSeleccionado] = useState(300);

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

  const handlePisoChange = (event) => {
    setPisoSeleccionado(event.target.value);
  };

  const renderHabitaciones = () => {
    const habitacionesPorPiso = {
      100: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
      200: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214],
      300: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314],
      400: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414],
      500: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514]
    };

    return habitacionesPorPiso[pisoSeleccionado].map(numero => {
      const habitacionA = estadoHabitaciones.find(h => h.numero === numero && h.cama === 'A');
      const habitacionB = estadoHabitaciones.find(h => h.numero === numero && h.cama === 'B');

      const colorA = habitacionA && habitacionA.estado === 'ocupada' ? 'red' : 'green';
      const colorB = habitacionB && habitacionB.estado === 'ocupada' ? 'red' : 'green';

      return (
        <Grid item key={numero} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Container maxWidth="sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)', 
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 1)', 
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px'
            }}>
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
        <Typography 
          variant="h4" 
          align="center" 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 1)', 
            padding: '10px', 
            borderRadius: '5px',
            display: 'inline-block',
            marginBottom: '20px'
          }}
        >
          Habitaciones
        </Typography>
        <FormControl variant="outlined" className="formControl" 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 1)', 
          padding: '10px', 
          borderRadius: '5px',
          marginBottom: '30px'
        }}>
          <InputLabel id="select-piso-label" sx={{fontWeight:"bold", color:'#fff'}}>Seleccionar Piso</InputLabel>
          <Select
            labelId="select-piso-label"
            id="select-piso"
            value={pisoSeleccionado}
            onChange={handlePisoChange}
            label="Seleccionar Piso"
            className="select"
           sx={{fontWeight:"bold"}}
          >
            <MenuItem value={100}>Piso 100</MenuItem>
            <MenuItem value={200}>Piso 200</MenuItem>
            <MenuItem value={300}>Piso 300</MenuItem>
            <MenuItem value={400}>Piso 400</MenuItem>
            <MenuItem value={500}>Piso 500</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3}>
          {renderHabitaciones()}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Pisos;
