import React from 'react';

const SearchMedicationCard = ({ medication }) => {
  return (
    <div className="medication-card">
      <div className="card-header">{medication.nombre}</div>
      <div className="card-body">
        <div className="card-title">{medication.accion_terapeutica}</div>
        <div className="card-text">
          <strong>Efectos Secundarios:</strong> {medication.efectos_secundarios || 'N/A'}
        </div>
        <div className="card-text">
          <strong>Contraindicaciones:</strong> {medication.contra_indicacion || 'N/A'}
        </div>
        <div className="card-text">
          <strong>Indicaciones:</strong> {medication.indicacion || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default SearchMedicationCard;
