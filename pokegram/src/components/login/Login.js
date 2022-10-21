import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';
import pokemon from '../../images/pikachu.jpg';
import userService from '../../services/userService';
import RootState from '../../models/rootState';

const theme = createTheme();

function Login(props) {
  const { parStates } = props;
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert('current state is: ' + user.username + ' ' + user.password);
    // testing code for state manipulation
    // console.log(props);
    await userService.login();
    parStates.handleSetStates(true, true, user.username);
  };
  const handleUsername = (event) => {
    // console.log(event.target.value);
    const updateuser = {
      username: event.target.value,
      password: user.password
    };
    setUser(updateuser);
  };
  const handlePassword = (event) => {
    // console.log(event.target.value);
    const updateuser = {
      username: user.username,
      password: event.target.value
    };
    setUser(updateuser);
  };
  const handleSignup = (event) => {
    event.preventDefault();
    parStates.handleSetStates(false, false, -1);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        >
          <Avatar alt="pikachu" sx={{ m: 1 }} src={pokemon} />
          <Typography component="h1" variant="h4">Wecome to Pokegram!</Typography>
        </Box>
        <Divider variant="middle" />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            marginTop: 20, my: 3, mx: 2, p: 4, border: '2px solid', borderRadius: '16px', boxShadow: 1, alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h6">Username:</Typography>
          <TextField margin="normal" required fullWidth id="username" label="Username" onChange={handleUsername} />
          <Typography component="h1" variant="h6">Password:</Typography>
          <TextField
            margin="normal"
            type="password"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={user.password}
            onChange={handlePassword}
            error={user.password !== '' && user.password.length < 8}
            helperText={user.password !== '' && user.password.length < 8 ? 'Password should contains Minimum eight characters' : ' '}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mat: 3, mb: 2 }}>Sign In</Button>
        </Box>
        <Box sx={{
          my: 3, mx: 2, p: 1, marginTop: 8, border: 1, alignItems: 'center', display: 'flex'
        }}
        >
          <Typography component="h1" variant="h6" style={{ marginLeft: '16px', marginRight: '64px' }}>No Account?</Typography>
          <Button type="submit" variant="contained" sx={{ marginTop: '16px', mat: 3, mb: 2 }} onClick={handleSignup}>Sign Up</Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
Login.propTypes = {
  parStates: PropTypes.instanceOf(RootState)
};

Login.defaultProps = {
  parStates: null
};
export default Login;
