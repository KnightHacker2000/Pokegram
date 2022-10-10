/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import { useState } from 'react';

function Home(props) {
    console.log(props);
    const [isAct, setIsAct] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [isPosts, setIsPosts] = useState(true);
    const [isProf, setIsProf] = useState(false);
    const [UID, setUID] = useState('');

    function nextToRender() {
        let ret;

        if (isAct) {
            // return Activity Page
        }

        if (isUp) {
            // return Upload Page
        }

        if (isPosts) {
            // return Posts Page
        }

        if (isProf) {
            // return Profile Page
        }
      }

    return (
        <div>
            {nextToRender()}
        </div>
    );
}

export default Home;
