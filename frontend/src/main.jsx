// frontend/src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>
);
