import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './menu';
import Act from '../activity/activity';
import Profile from '../profile/Profile';
import Posts from '../posts/Post';
import Upload from '../posts/Upload';
import RootState from '../../models/rootState';
import HomeState from '../../models/homeState';
import userService from '../../services/userService';

function Home(props) {
  // const defaultProps = new RootState(
  //   true,
  //   true,
  //   1
  // );
  const { parStates } = props;
  const [isAct, setIsAct] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [isPosts, setIsPosts] = useState(true);
  const [isProf, setIsProf] = useState(false);
  const [UID, setUID] = useState(-1);
  // console.log(parStates);
  const theme = createTheme();

  const handleHomeStates = (isLogOut, newIsProf, newIsAct, newIsUp, newIsPosts, newUID) => {
    setIsAct(newIsAct);
    setIsPosts(newIsPosts);
    setUID(newUID);
    setIsProf(newIsProf);
    setIsUp(newIsUp);

    // handle log out
    if (isLogOut) {
      userService.logout();
      parStates.handleSetStates(false, true, '');
    }
  };
  const parentStates = new HomeState(
    UID,
    handleHomeStates,
    isAct,
    isPosts,
    isProf,
    isUp,
    parStates.myUID
  );
  function nextToRender() {
    let ret;

    if (isAct) {
      // return Activity Page
      ret = <Act.Act homeStates={parentStates} />;
    }

    if (isUp) {
      // return Upload Page
      ret = <Upload homeStates={parentStates} />;
    }

    if (isPosts) {
      console.log(parentStates);
      // return Posts Page
      ret = <Posts homeStates={parentStates} />;
    }

    if (isProf) {
      // return Profile Page
      ret = <Profile homeStates={parentStates} />;
    }

    return ret;
  }

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar homeStates={parentStates} />
      {nextToRender()}
    </ThemeProvider>
  );
}

Home.propTypes = {
  parStates: PropTypes.instanceOf(RootState)
};

Home.defaultProps = {
  parStates: null
};
export default Home;
