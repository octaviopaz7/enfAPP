import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress, Container } from '@mui/material'; // Importa los componentes de Material-UI necesarios
import SearchMedicationCard from './SearchMedicationCard';
import api from '../../../../backend/src/routes/api'; // Asegúrate de importar correctamente la instancia de Axios
import Swal from 'sweetalert2';

const SearchMedication = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

        const uniqueMedications = data.filter(
          (medication, index, self) =>
            index === self.findIndex((m) => m.nombre === medication.nombre)
        );

        setMedications(uniqueMedications);

        if (uniqueMedications.length === 0) {
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
        setLoading(false); // Finalizar carga, ya sea con éxito o error
      }
    };

    if (query) {
      fetchMedications();
    }
  }, [query]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`?query=${event.target.value}`);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

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
  
    console.log("Medications:", medications);
  
    if (medications.length > 0) {
      return (
        <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {medications.map((medication, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} style={{ marginBottom: '20px' }}>
              <SearchMedicationCard medication={medication} />
            </Grid>
          ))}
        </Container>
      );
    }
  
    return null;
  };

  return <Box>{renderResults()}</Box>;
};

export default SearchMedication;
