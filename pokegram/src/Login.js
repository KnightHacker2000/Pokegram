import React, { useState } from 'react';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  function handleSubmit(event) {
    event.preventDefault();
    // alert('current state is: ' + user.username + ' ' + user.password);
  }
  function handleUsername(event) {
    console.log(event.target.value);
    const updateuser = {
      username: event.target.value,
      password: user.password
    };
    setUser(updateuser);
  }
  function handlePassword(event) {
    console.log(event.target.value);
    const updateuser = {
      username: user.username,
      password: event.target.value
    };
    setUser(updateuser);
  }
  return (
    <div className="body">
      <div className="header">
        Welcome to Pokemongram!
      </div>
      <div className="login-section">
        <form onSubmit={handleSubmit}>
          <label className="userinfo" id="username"><b>Username</b></label>
          <br />
          <input type="text" name="username" onChange={handleUsername} />
          <br />
          <label className="userinfo" id="password"><b>Password</b></label>
          <br />
          <input type="password" name="password" onChange={handlePassword} />
          <br />
          <button type="submit" className="loginButton">Login</button>
        </form>
      </div>
      <div className="signup-section">
        <b>No Account?</b>
        <button type="submit" className="signupButton">Sign Up</button>
      </div>
    </div>
  );
}
export default Login;
