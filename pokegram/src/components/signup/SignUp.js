/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';

const theme = createTheme();

function SignUp(props) {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  return (
    <p>this is Sign</p>
  );
}
export default SignUp;
