import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import DripCalculatorIcon from './DripCalculatorIcon'
import api from '../../../../backend/src/routes/api';
import Swal from 'sweetalert2';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [query, setQuery] = useState('');
  const [medications, setMedications] = useState([]);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setNombreUsuario(usuario);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Mostrar SweetAlert2 al cerrar sesión exitosamente
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: '¡Has cerrado sesión exitosamente!',
    }).then(() => {
      handleMenuClose();
      navigate('/login');
    });
  };

  const handleChangePassword = () => {
    handleMenuClose();
    navigate('/cambiar-contraseña');
  };

  const handleHomeClick = () => {
    navigate('/pisos');
  };

  const handleGoteoClick = () => {
    navigate('/calculadora-de-goteo');
  };

  const menuId = 'primary-search-account-menu';

  const handleSearch = async () => {
    if (!query) {
      return;
    }

    try {
      const response = await api.get('/medicamentos/search', {
        params: { nombre: query }
      });

      setMedications(response.data);
      navigate(`/Search-medication/search?query=${query}`);

    } catch (error) {
      console.error('Error fetching vademecum data:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              onClick={handleHomeClick}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Enfermería
            </Typography>
          </Box>
          <div className="Search">
            <div className="SearchIconWrapper">
              <SearchIcon />
            </div>
            <InputBase
              className="StyledInputBase"
              placeholder="Buscar Medicamento"
              inputProps={{ 'aria-label': 'buscar' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="calculadora de goteo"
              onClick={handleGoteoClick}
              color="inherit"
              sx={{ marginLeft: 'auto' }} // Añade espacio a la derecha
            >
              <DripCalculatorIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer', marginRight: '10px' }}
            >
              {nombreUsuario && `Bienvenido, ${nombreUsuario}`}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="cuenta del usuario actual"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleChangePassword}>Cambiar Contraseña</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;