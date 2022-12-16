import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import userService from '../../services/userService';
import RootState from '../../models/rootState';

const theme = createTheme();
const MySwal = withReactContent(Swal);

function Login(props) {
  const { parStates } = props;
  const [connected, setConnected] = useState(sessionStorage.getItem('app-token') !== null);
  const [user, setUser] = useState({
    username: sessionStorage.getItem('uid') == null ? 'test1' : sessionStorage.getItem('uid'),
    password: undefined
  });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (connected && sessionStorage.getItem('logout') === 'false') {
      parStates.handleSetStates(true, true, user.username);
    }
  });

  const handleUnlock = () => {
    setFailed(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert('current state is: ' + user.username + ' ' + user.password);
    // testing code for state manipulation
    // console.log(props);
    try {
      if (failed >= 5) {
        MySwal.fire('Please try again latter!');
        return;
      }
      if (
        connected || await userService.login(
          JSON.stringify({ id: user.username, password: user.password })
        )
      ) {
        setConnected(true);
        sessionStorage.setItem('logout', false);
        parStates.handleSetStates(true, true, user.username);
      }
      // console.log(res);
    } catch (err) {
      if (err.message && err.message === 'bad auth') {
        if (failed + 1 >= 5) {
          setFailed(failed + 1);
          setTimeout(handleUnlock, 50000);
        } else {
          MySwal.fire('Incorrect password or username!');
          setFailed(failed + 1);
        }
      }
    }
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
          <Avatar alt="pikachu" sx={{ m: 1 }} src="" />
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
          <TextField margin="normal" required fullWidth id="username" label="Username" data-testid="test_username" onChange={handleUsername} />
          <Typography component="h1" variant="h6">Password:</Typography>
          <TextField
            data-testid="test_password"
            margin="normal"
            type="password"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={user.password === undefined ? '' : user.password}
            onChange={handlePassword}
            error={user.password !== undefined && user.password !== '' && user.password.length < 8}
            helperText={user.password !== undefined && user.password !== '' && user.password.length < 8 ? 'Password should contains Minimum eight characters' : ' '}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mat: 3, mb: 2 }} data-testid="login_submit">Sign In</Button>
        </Box>
        <Box sx={{
          my: 3, mx: 2, p: 1, marginTop: 8, border: 1, alignItems: 'center', display: 'flex'
        }}
        >
          <Typography component="h1" variant="h6" style={{ marginLeft: '16px', marginRight: '64px' }}>No Account?</Typography>
          <Button type="submit" variant="contained" sx={{ marginTop: '16px', mat: 3, mb: 2 }} data-testid="login_signup" onClick={handleSignup}>Sign Up</Button>
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
