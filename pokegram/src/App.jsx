/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Login from './components/login/Login';
import Home from './components/home/home';
import SignUp from './components/signup/SignUp';
import RootState from './models/rootState';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isReg, setIsReg] = useState(true);
  const [myUID, setMyUID] = useState(1);

  const handleSetStates = (newLogin, newReg, newMyUID) => {
    setIsLogin(newLogin);
    setIsReg(newReg);
    setMyUID(newMyUID);
  };

  const parentStates = new RootState(isLogin, isReg, myUID, handleSetStates);

  function nextToRender() {
    let ret;
    if (!isLogin) {
      ret = isReg
        ? <Login parStates={parentStates} />
        : <SignUp parStates={parentStates} />;
    } else {
      ret = <Home parStates={parentStates} />;
    }
    return ret;
  }

  return (
    <div>
      {nextToRender()}
    </div>
  );
}

export default App;
