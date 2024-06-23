import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress } from '@mui/material'; // Importa los componentes de Material-UI necesarios
import SearchMedicationCard from './SearchMedicationCard';
import api from '../../../backend/src/routes/api'; // Asegúrate de importar correctamente la instancia de Axios

const SearchMedication = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true); // Iniciar carga

      try {
        const response = await api.get(`/medicamentos/search?nombre=${query}`);
        const data = await response.data; // Asegúrate de obtener correctamente los datos de la respuesta
        setMedications(data);
      } catch (error) {
        console.error('Error al obtener medicamentos:', error.message);
        setError('Error al obtener medicamentos. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false); // Finalizar carga, ya sea con éxito o error
      }
    };

    if (query) {
      fetchMedications();
    }
  }, [query]);

  const renderResults = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      );
    }

    if (medications.length > 0) {
      return (
        <Box>
          <Grid container spacing={3} justifyContent="center">
            {medications.map((medication, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <SearchMedicationCard medication={medication} />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }
  };

  return <Box>{renderResults()}</Box>;
};

export default SearchMedication;
