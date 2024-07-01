import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import api from '../../../../backend/src/routes/api'; // Asegúrate de que la ruta es correcta
import { useHabitaciones } from '../hooks/HabitacionesContext';
import { useParams } from 'react-router-dom';

function Main() {
    const { numero, cama } = useParams();
    const [habitacion, setHabitacion] = useState(null);
    const [paciente, setPaciente] = useState(null); // Aquí se almacenará el objeto completo del paciente
    const [nombrePaciente, setNombrePaciente] = useState(''); // Nombre del paciente
    const [apellidoPaciente, setApellidoPaciente] = useState(''); // Apellido del paciente
    const { obtenerEstadoHabitaciones } = useHabitaciones();

    const [nombreUsuario, setNombreUsuario] = useState('');
    const { estadoHabitaciones } = useHabitaciones();
    const [habitacionesOcupadas, setHabitacionesOcupadas] = useState([]);
    const [pisoSeleccionado, setPisoSeleccionado] = useState(300);

    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            setNombreUsuario(usuario);
        }
    }, []);

    useEffect(() => {
        const fetchHabitacionesOcupadas = async () => {
            try {
                console.log("Estado de habitaciones:", estadoHabitaciones);
                const habitacionesEnPiso = estadoHabitaciones.filter(habitacion => habitacion.numero.toString().startsWith(pisoSeleccionado.toString()) && habitacion.estado === 'ocupada');
                console.log("Habitaciones en el piso seleccionado:", habitacionesEnPiso);
                const habitacionesConPacientes = await Promise.all(habitacionesEnPiso.map(async (habitacion) => {
                    const response = await api.get(`/habitaciones/${habitacion.numero}/${habitacion.cama}`);
                    console.log(`Datos de la habitación ${habitacion.numero} ${habitacion.cama}:`, response.data);

                    // Obtener datos del paciente si está ocupada y existe paciente
                    if (habitacion.estado === 'ocupada') {
                        // Obtener datos completos del paciente
                        const pacienteResponse = await api.get(`/pacientes/${response.data.pacienteDni}`);
                        console.log(`Datos del paciente ${response.data.pacienteDni}:`, pacienteResponse.data);
                        setPaciente(pacienteResponse.data);

                        // Extraer nombre y apellido del paciente
                        setNombrePaciente(pacienteResponse.data.nombre);
                        setApellidoPaciente(pacienteResponse.data.apellido);
                        
                        return { ...response.data, paciente: pacienteResponse.data };
                    } else {
                        return { ...response.data, paciente: null };
                    }
                }));
                console.log("Habitaciones ocupadas con pacientes:", habitacionesConPacientes);
                setHabitacionesOcupadas(habitacionesConPacientes);
            } catch (error) {
                console.error('Error al obtener las habitaciones ocupadas:', error);
            }
        };

        fetchHabitacionesOcupadas();
    }, [pisoSeleccionado, estadoHabitaciones]);

    useEffect(() => {
        if (numero && cama) {
            fetchHabitacion(numero, cama);
        }
    }, [numero, cama]);

    useEffect(() => {
        if (habitacion && habitacion.pacienteDni) {
            fetchNombrePaciente(habitacion.pacienteDni);
        }
    }, [habitacion]);

    const fetchNombrePaciente = async (dni) => {
        try {
            const response = await api.get(`/paciente/${nombre}/${dni}`);
            setNombrePaciente(response.data.nombre);
            setApellidoPaciente(response.data.apellido);
        } catch (error) {
            console.error('Error al obtener el nombre del paciente:', error);
        }
    };

    const handlePisoChange = (event) => {
        setPisoSeleccionado(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Panel de Administración del Paciente
            </Typography>
            <FormControl variant="outlined" className="formControl" sx={{ marginBottom: '20px' }}>
                <InputLabel id="select-piso-label">Seleccionar Piso</InputLabel>
                <Select
                    labelId="select-piso-label"
                    id="select-piso"
                    value={pisoSeleccionado}
                    onChange={handlePisoChange}
                    label="Seleccionar Piso"
                >
                    <MenuItem value={100}>Piso 100</MenuItem>
                    <MenuItem value={200}>Piso 200</MenuItem>
                    <MenuItem value={300}>Piso 300</MenuItem>
                    <MenuItem value={400}>Piso 400</MenuItem>
                    <MenuItem value={500}>Piso 500</MenuItem>
                </Select>
            </FormControl>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Habitación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Paciente DNI</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Dieta</TableCell>
                            <TableCell>Enfermero</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {habitacionesOcupadas.map((habitacion, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${habitacion.numero} ${habitacion.cama}`}</TableCell>
                                <TableCell>Ocupada</TableCell>
                                <TableCell>{habitacion.pacienteDni}</TableCell>
                                <TableCell>{nombrePaciente || 'N/A'}</TableCell>
                                <TableCell>{apellidoPaciente || 'N/A'}</TableCell>
                                <TableCell>{paciente.dieta || 'N/A'}</TableCell>
                                <TableCell>{nombreUsuario}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Main;
