import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

const SearchMedicationCard = ({ medication }) => {
  return (
    <Card className="medication-card">
      <CardContent>
        <Typography className="card-header">{medication.nombre}</Typography>
        <Divider />
        <Box className="card-body">
          <Typography className="card-text">
            <strong>Acción Terapéutica:</strong> {medication.accion_terapeutica}
          </Typography>
          <Typography className="card-text">
            <strong>Efectos Secundarios:</strong> {medication.efectos_secundarios || 'N/A'}
          </Typography>
          <Typography className="card-text">
            <strong>Contraindicaciones:</strong> {medication.contra_indicacion || 'N/A'}
          </Typography>
          <Typography className="card-text">
            <strong>Indicaciones:</strong> {medication.indicacion || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchMedicationCard;
