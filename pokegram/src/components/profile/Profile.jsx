import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import userimage from '../../images/jieni.jpg';
import Posts from '../posts/Post';
import userService from '../../services/userService';
import User from '../../models/user';
import HomeState from '../../models/homeState';
import Follows from './Follows';
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
  const { homeStates } = props;
  const firstRendering = useRef(true);
  const [user, setUser] = useState(new User());
  const [myUser, setMyUser] = useState(new User());
  const [isFollow, setIsFollow] = useState(false);
  const [showFo, setShowFo] = useState(false);
  const [foSug, setFoSug] = useState([]);
  const [, updateState] = React.useState();
  const [childchange, setchildchange] = React.useState(false);
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const handleischange = () => { setchildchange(!childchange); };
  useEffect(() => {
    // TODO: getUser just testing, use prop.UID in the future
    const params = { userId: homeStates.UID };
    const myParams = { userId: homeStates.myUID };
    async function fetchData() {
      const data = await userService.getUserById(params);
      setUser(data);
      await userService.getUserById(myParams).then((d) => {
        setMyUser(d);
        if (d.follows.indexOf(data.id) !== -1) {
          setIsFollow(true);
        }
      });
      await userService.getFoSug(homeStates.UID).then((d) => { setFoSug(d.data); });

      // Test code for update endpoint
      // await userService.getUserById(JSON.parse(params)).then((data) => {
      //   setUser(data);
      //   userService.unfollowUser(data, 2);
      // });
    }

    if (user.id !== homeStates.UID || firstRendering.current || childchange) {
      firstRendering.current = false;
      setchildchange(false);
      fetchData();
    }
  }, [isFollow, childchange, homeStates]);

  const handleLogout = (event) => {
    // console.log(props);
    event.preventDefault();
    sessionStorage.removeItem('app-token');
    sessionStorage.setItem('logout', true);
    sessionStorage.removeItem('uid');
    homeStates.handleHomeStates(
      true,
      homeStates.isProf,
      homeStates.isAct,
      homeStates.isUp,
      homeStates.isPosts,
      homeStates.UID
    );
    // console.log(props);
  };
  const handleFollow = async (event) => {
    event.preventDefault();
    // console.log(user);
    await userService.followUser(myUser, user);
    firstRendering.current = true;
    setIsFollow(true);
    forceUpdate();
  };

  const handleUnfollow = async (event) => {
    event.preventDefault();
    await userService.unfollowUser(myUser, user);
    firstRendering.current = true;
    setIsFollow(false);
    forceUpdate();
  };

  const handleFollowerCick = () => {
    setShowFo(true);
  };

  const handleShowFo = () => {
    setShowFo(false);
    forceUpdate();
  };

  const getFoList = () => user.follows;

  function ConditionalRender() {
    let usersection;
    if (homeStates.UID === homeStates.myUID) {
      // console.log(user);
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
            {user.id}
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
            {user.id}
          </Typography>
          {!isFollow && <Button type="submit" variant="contained" sx={{ marginTop: '16px', mat: 3, mb: 2 }} onClick={handleFollow}>Follow</Button>}
          {isFollow && <Button type="submit" variant="contained" sx={{ marginTop: '16px', mat: 3, mb: 2 }} onClick={handleUnfollow}>Unfollow</Button>}
        </Box>
      );
    }
    return (usersection);
  }
  return (
    <ThemeProvider theme={theme}>
      { showFo
        && (
        <Follows
          showSug={homeStates.UID === homeStates.myUID}
          foSug={foSug}
          handleShowFo={handleShowFo}
          homeStates={homeStates}
          foList={getFoList()}
        />
        ) }
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 3, mx: 2, p: 1, marginTop: 0, alignItems: 'center', display: 'flex'
          }}
        >
          <Avatar alt="pikachu" sx={{ height: '100px', width: '100px' }} src="http://img4.wikia.nocookie.net/__cb20140328190757/pokemon/images/thumb/2/21/001Bulbasaur.png/200px-001Bulbasaur.png" />
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
              <Typography sx={{ marginLeft: 5, marginRight: 10 }}>
                {user.numPosts}
                Posts
              </Typography>
              <Typography sx={{ marginRight: 10 }}>
                {user.numSubs}
                Subscribers
              </Typography>
              <Typography sx={{ marginRight: 10 }} onClick={handleFollowerCick}>
                {user.numFollows}
                Follows
              </Typography>
            </Box>
            <Typography sx={{ marginTop: 0, marginLeft: 7 }}>This is self-Introduction</Typography>
          </Box>
        </Box>
      </Container>
      <Divider />
      <Posts homeStates={homeStates} ischange={handleischange} />
    </ThemeProvider>
  );
}
Profile.propTypes = {
  homeStates: PropTypes.instanceOf(HomeState)
};

Profile.defaultProps = {
  homeStates: null
};
export default Profile;
