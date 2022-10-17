/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userimage from '../../images/jieni.jpg';
import Posts from '../posts/Post';
import userService from '../../services/userService';
import User from '../../models/user';
// import { TextField } from '@mui/material';

// const user = {
//   id: 1,
//   email: 'Rachel@gmail.com',
//   username: 'Rachel',
//   password: 'RachelYuan',
//   numPosts: 10,
//   likedPost: [1, 2, 3],
//   follows: [1, 2, 3],
//   numFollows: 57,
//   subscribers: [1, 2, 3],
//   numSubs: 1,
//   comments: [1, 2, 3],
//   activities: [1, 2, 3]
// };
const theme = createTheme();
function Profile(props) {
  const {
    myUID, isAct, isUp, isPosts, isProf, UID, handleHomeStates
  } = props.homeStates;
  const firstRendering = useRef(true);
  const [user, setUser] = useState(new User());

  useEffect(() => {
    // TODO: getUser just testing, use prop.UID in the future
    const params = '{"userId": 1}';
    async function fetchData() {
      const data = await userService.getUserById(JSON.parse(params));
      setUser(data);

      // Test code for update endpoint
      // await userService.getUserById(JSON.parse(params)).then((data) => {
      //   setUser(data);
      //   userService.unfollowUser(data, 2);
      // });
    }

    if (firstRendering.current) {
      firstRendering.current = false;
      fetchData();
    }
  });
  const handleLogout = (event) => {
    // console.log(props);
    event.preventDefault();
    handleHomeStates(true, isProf, isAct, isUp, isPosts, UID);
    // console.log(props);
  };
  const handleFollow = (event) => {
    event.preventDefault();
    // console.log(event.cu);
  };

  function ConditionalRender() {
    let usersection;
    if (UID === myUID) {
      usersection = (
        <Box sx={{
          mx: 2, p: 1, alignItems: 'center', display: 'flex'
        }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginLeft: '16px',
              marginRight: '64px',
              fontWeight: 'bold',
              font: ''
            }}
          >
            {user.username}
          </Typography>
          <Button type="submit" variant="contained" sx={{ marginTop: '16px', mat: 3, mb: 2 }} onClick={handleLogout}>Log Out</Button>
        </Box>
      );
    } else {
      usersection = (
        <Box sx={{
          mx: 2, p: 1, alignItems: 'center', display: 'flex'
        }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginLeft: '16px',
              marginRight: '64px',
              fontWeight: 'bold',
              font: ''
            }}
          >
            {user.username}
          </Typography>
          <Button type="submit" variant="contained" sx={{ marginTop: '16px', mat: 3, mb: 2 }} onClick={handleFollow}>Follow</Button>
        </Box>
      );
    }
    return (usersection);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 3, mx: 2, p: 1, marginTop: 0, alignItems: 'center', display: 'flex'
          }}
        >
          <Avatar alt="pikachu" sx={{ height: '100px', width: '100px' }} src={userimage} />
          <Box
            sx={{
              mx: 2, p: 1, marginTop: 5, alignItems: 'center'
            }}
          >
            {ConditionalRender()}
            <Box
              sx={{
                my: 3, mx: 2, alignItems: 'center', display: 'flex'
              }}
            >
              <Typography sx={{ marginLeft: 5, marginRight: 10 }}>{user.numPosts} Posts</Typography>
              <Typography sx={{ marginRight: 10 }}>{user.numSubs} Subscribers</Typography>
              <Typography sx={{ marginRight: 10 }}>{user.numFollows} Follows</Typography>
            </Box>
            <Typography sx={{ marginTop: 0, marginLeft: 7 }}>This is self-Introduction</Typography>
          </Box>
        </Box>
      </Container>
      <Divider />
      <Posts />
    </ThemeProvider>
  );
}
export default Profile;
