import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
// import AdbIcon from '@mui/icons-material/Adb';
// import avatar from '../../images/pikachu.jpg';
import HomeState from '../../models/homeState';

const pages = ['ACTIVITY', 'UPLOAD', 'LOGOUT'];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [, setAnchorElUser] = useState(null);
  // console.log(anchorElUser);
  const { homeStates } = props;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleProfPicClick = (event) => {
    setAnchorElUser(event.currentTarget);
    homeStates.handleHomeStates(false, true, false, false, false, homeStates.myUID);
  };
  const handlePokegramClick = (event) => {
    setAnchorElUser(event.currentTarget);
    homeStates.handleHomeStates(false, false, false, false, true, homeStates.myUID);
  };

  const handleCloseNavMenu = (event) => {
    const nextPage = (event.target.textContent);
    switch (nextPage) {
      // set activity page
      case pages[0]:
        homeStates.handleHomeStates(false, false, true, false, false, homeStates.UID);
        break;
      // set upload page
      case pages[1]:
        homeStates.handleHomeStates(false, false, false, true, false, homeStates.UID);
        break;
      // set logout
      case pages[2]:
        homeStates.handleHomeStates(true, false, false, false, false, homeStates.myUID);
        break;
      default:
        break;
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
            onClick={handlePokegramClick}
          >
            Pokegram
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Pokegram
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleProfPicClick} sx={{ p: 0 }}>
                <Avatar alt="profPic" src="http://img4.wikia.nocookie.net/__cb20140328190757/pokemon/images/thumb/2/21/001Bulbasaur.png/200px-001Bulbasaur.png" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

ResponsiveAppBar.propTypes = {
  homeStates: PropTypes.instanceOf(HomeState)
};

ResponsiveAppBar.defaultProps = {
  homeStates: null
};
export default ResponsiveAppBar;
