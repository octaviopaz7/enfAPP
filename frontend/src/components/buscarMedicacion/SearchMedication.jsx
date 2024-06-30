import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress, Container } from '@mui/material';
import SearchMedicationCard from './SearchMedicationCard';
import api from '../../../../backend/src/routes/api';
import Swal from 'sweetalert2';

const SearchMedication = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      try {
        const response = await api.get('/medicamentos/search', {
          params: { nombre: query }
        });

        const data = response.data;
        const uniqueMedications = data.filter(
          (medication, index, self) =>
            index === self.findIndex((m) => m.nombre === medication.nombre)
        );

        setMedications(uniqueMedications);

        if (uniqueMedications.length === 0 && query !== '') {
          Swal.fire({
            title: 'No encontrado',
            text: 'No se encontró ningún medicamento con ese nombre.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        console.error('Error al obtener medicamentos:', error.message);
        setError('Error al obtener medicamentos. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
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
        <Container sx={{ paddingTop: '20px' }}>
          <Grid container spacing={3}>
            {medications.map((medication, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <SearchMedicationCard medication={medication} />
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    }

    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" color="textSecondary">
          No se encontraron medicamentos.
        </Typography>
      </Box>
    );
  };

  return <Box>{renderResults()}</Box>;
};

export default SearchMedication;
