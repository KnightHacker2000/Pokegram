/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './menu';
import Act from '../activity/activity';
import Profile from '../profile/Profile';
import Posts from '../posts/Post';
import Upload from '../posts/Upload';

function Home(props) {
    // console.log(props);
    const myUID = props.parStates.myUID;
    const handleRootState = props.parStates.handleSetStates;
    const [isAct, setIsAct] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [isPosts, setIsPosts] = useState(true);
    const [isProf, setIsProf] = useState(false);
    const [UID, setUID] = useState(66);

    const theme = createTheme();

    const handleHomeStates = (isLogOut, newIsProf, newIsAct, newIsUp, newIsPosts, newUID) => {
        setIsAct(newIsAct);
        setIsPosts(newIsPosts);
        setUID(newUID);
        setIsProf(newIsProf);
        setIsUp(newIsUp);

        // handle log out
        if (isLogOut) {
            handleRootState(false, true, '');
        }
    };
    const parentStates = {
        myUID,
        isAct,
        isUp,
        isPosts,
        isProf,
        UID,
        handleHomeStates
    };
    function nextToRender() {
        let ret;

        if (isAct) {
            // return Activity Page
            ret = <Act homeStates={parentStates} />;
        }

        if (isUp) {
            // return Upload Page
            ret = <Upload />;
        }

        if (isPosts) {
            // return Posts Page
            ret = <Posts />;
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

export default Home;
