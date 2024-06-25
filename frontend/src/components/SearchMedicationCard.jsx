import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SearchMedicationCard = ({ medication }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 1)',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 40px 10px 40px', // Espacio adicional opcional entre tarjetas
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" align="center" fontWeight="bold">
          {medication.nombre}
        </Typography>
        <Typography variant="subtitle1" component="div" align="center" fontWeight="bold" marginBottom={1}>
          {medication.accion_terapeutica}
        </Typography>
        <div className="card-text">
          <strong>Efectos Secundarios:</strong> {medication.efectos_secundarios || 'N/A'}
        </div>
        <div className="card-text">
          <strong>Contraindicaciones:</strong> {medication.contra_indicacion || 'N/A'}
        </div>
        <div className="card-text">
          <strong>Indicaciones:</strong> {medication.indicacion || 'N/A'}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchMedicationCard;
