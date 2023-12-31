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
import validator from 'validator';
import userService from '../../services/userService';
import RootState from '../../models/rootState';
import User from '../../models/user';

const theme = createTheme();

function SignUp(props) {
  const { parStates } = props;
  const [user, setUser] = useState({
    fullname: '',
    username: '',
    emailaddress: '',
    password: ''
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert('current state is: ' + user.username + ' ' + user.password);
    // testing code for state manipulation
    // console.log(props);

    // TODO: create new user, call register endpoint
    const newUser = new User(
      user.username,
      user.emailaddress
    );
    newUser.fullname = user.fullname;
    try {
      const res = await userService.register(
        JSON.stringify(
          {
            id: user.username,
            email: user.emailaddress,
            fullname: user.fullname,
            password: user.password
          }
        )
      );
      console.log(res);
      parStates.handleSetStates(true, true, user.username);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFullname = (event) => {
    // console.log(event.target.value);
    const updateuser = {
      fullname: event.target.value,
      username: user.username,
      emailaddress: user.emailaddress,
      password: user.password
    };
    setUser(updateuser);
  };
  const handleUsername = (event) => {
    // console.log(event.target.value);
    const updateuser = {
      fullname: user.fullname,
      username: event.target.value,
      emailaddress: user.emailaddress,
      password: user.password
    };
    setUser(updateuser);
  };
  const handleEmailaddress = (event) => {
    // console.log(event.target.value);
    const updateuser = {
      fullname: user.fullname,
      username: user.username,
      emailaddress: event.target.value,
      password: user.password
    };
    setUser(updateuser);
  };
  const handlePassword = (event) => {
    // console.log(event.target.value);
    const updateuser = {
      fullname: user.fullname,
      username: user.username,
      emailaddress: user.emailaddress,
      password: event.target.value
    };
    setUser(updateuser);
  };
  const handleSignin = (event) => {
    event.preventDefault();
    parStates.handleSetStates(false, true, user.username);
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
          <Avatar alt="pikachu" sx={{ m: 1 }} src="http://img4.wikia.nocookie.net/__cb20140328190757/pokemon/images/thumb/2/21/001Bulbasaur.png/200px-001Bulbasaur.png" />
          <Typography component="h1" variant="h4">Wecome to Pokegram!</Typography>
          <Typography component="h2" variant="h6">Register with Pokemongram, Pika Pika</Typography>
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
          <Typography component="h1" variant="h6">Full Name:</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Fullname"
            name="fullname"
            value={user.fullname}
            onChange={handleFullname}
          />
          <Typography component="h1" variant="h6">Username:</Typography>
          <TextField margin="normal" required fullWidth id="username" label="Username" onChange={handleUsername} />
          <Typography component="h1" variant="h6">Password:</Typography>
          <TextField
            margin="normal"
            type="password"
            label="Password"
            required
            fullWidth
            id="password"
            name="password"
            value={user.password}
            onChange={handlePassword}
            error={user.password !== '' && user.password.length < 8}
            helperText={user.password !== '' && user.password.length < 8 ? 'Password should contains Minimum eight characters' : ' '}
          />
          <Typography component="h1" variant="h6">Email Address:</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="emailaddress"
            label="Email address"
            name="emailaddress"
            value={user.emailaddress}
            onChange={handleEmailaddress}
            error={user.emailaddress !== '' && !validator.isEmail(user.emailaddress)}
            helperText={user.emailaddress !== '' && !validator.isEmail(user.emailaddress) ? 'invalid email address' : ' '}
          />
          <Button data-testid="signUp_submit" type="submit" fullWidth variant="contained" sx={{ mat: 3, mb: 2 }} onClick={handleSubmit}>Sign Up</Button>
        </Box>
        <Box sx={{
          my: 3, mx: 2, p: 1, marginTop: 8, border: 1, alignItems: 'center', display: 'flex'
        }}
        >
          <Typography component="h1" variant="h6" style={{ marginLeft: '16px', marginRight: '64px' }}>Had an Account?</Typography>
          <Button data-testid="signIn_submit" type="submit" variant="contained" sx={{ marginTop: '16px', mat: 3, mb: 2 }} onClick={handleSignin}>Sign In</Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
SignUp.propTypes = {
  parStates: PropTypes.instanceOf(RootState)
};

SignUp.defaultProps = {
  parStates: null
};
export default SignUp;
