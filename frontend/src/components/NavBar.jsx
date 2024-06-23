import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem, Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import api from '../../../backend/src/routes/api';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(2), // Aumentado a 2 para duplicar el tamaño
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4), // Ajustado para el tamaño duplicado
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5), // Aumentado el padding para el icono de búsqueda
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1.5), // Aumentado el padding del input base
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`, // Ajustado el paddingLeft para el input base
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch', // Aumentado el tamaño del input base para pantallas grandes
    },
  },
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [query, setQuery] = useState('');
  const [medications, setMedications] = useState([]);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/login');
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'buscar' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
              onClick={handleGoteoClick}
            >
              Calculadora de Goteo
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        <MenuItem disabled>{nombreUsuario}</MenuItem>
        <MenuItem onClick={handleChangePassword}>Cambiar Contraseña</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
