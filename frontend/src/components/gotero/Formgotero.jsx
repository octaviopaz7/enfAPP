import React, { useState } from 'react';

const FormGotero = ({ onCalculate }) => {
  const [volume, setVolume] = useState('');
  const [volumeUnit, setVolumeUnit] = useState('ml');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('hours');
  const [goteroType, setGoteroType] = useState('Normogotero');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({ volume, volumeUnit, time, timeUnit, goteroType });
  };

  return (
    <form onSubmit={handleSubmit} className="form-gotero">
      <div className="selector-gotero">
        <button
          type="button"
          className={goteroType === 'Normogotero' ? 'active' : ''}
          onClick={() => setGoteroType('Normogotero')}
        >
          Normogotero
        </button>
        <button
          type="button"
          className={goteroType === 'Microgotero' ? 'active' : ''}
          onClick={() => setGoteroType('Microgotero')}
        >
          Microgotero
        </button>
      </div>
      <div className="form-group">
        <label>Volumen:</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          required
        />
        <select
          value={volumeUnit}
          onChange={(e) => setVolumeUnit(e.target.value)}
        >
          <option value="ml">ml</option>
          <option value="liters">litros</option>
        </select>
      </div>
      <div className="form-group">
        <label>Tiempo:</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <select
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
        >
          <option value="hours">horas</option>
          <option value="minutes">minutos</option>
        </select>
      </div>
      <button type="submit" className="btn-calculate">Calcular</button>
    </form>
  );
};

export default FormGotero;
