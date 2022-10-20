/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Login from './components/login/Login';
import Home from './components/home/home';
import SignUp from './components/signup/SignUp';

function App(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [isReg, setIsReg] = useState(true);
  const [myUID, setMyUID] = useState(1);

  const handleSetStates = (newLogin, newReg, newMyUID) => {
    setIsLogin(newLogin);
    setIsReg(newReg);
    setMyUID(newMyUID);
  };

  let parentStates = {
    isLogin,
    isReg,
    myUID,
    handleSetStates
  };

  function nextToRender() {
    let ret;
    if (!isLogin) {
      ret = isReg 
        ? <Login parStates={parentStates} />
        : <SignUp parStates={parentStates} />;
    } else {
      ret = <Home parStates={parentStates} />;
    }
    // return <Profile parStates={parentStates} UID={-1} />;
    return ret;
  }

  return (
    <div>
      {nextToRender()}
    </div>
  );
}

export default App;
