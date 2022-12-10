import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import SignUp from '../sign-up/SignUp';
import Homepage from '../homepage/Homepage';
import Logo from '../homepage/Logo';
import './Login.css';

//sending username and password to server
async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      username: username,
      password: password
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }

  const res = await fetch(`${configFile.serverURL}/login`, options);
  const userData = await res.json();

  if (userData.status != 'failed') {
    localStorage.setItem('user', JSON.stringify({
      username: username,
      password: password,
      isLoggedIn: true,
      userIndex: userData.userIndex,
    }));

    //saving chat data to local storage 
    await localStorage.setItem('chatData', JSON.stringify({
      groups: userData.groups,
      friends: userData.friends
    }));

    ReactDOM.render(
      <Homepage frame={Logo} />, document.getElementById('root')
    );

    window.location.reload();
  } else {
    alert('Incorrect username or password, please try again');
  }
}

//rendering the sign up page
function renderSignUp() {
  ReactDOM.render(
    <SignUp />, document.getElementById('root')
  );
}

class Login extends React.Component {
  render() {
    return (
      <div className='login' id='login'>
        <h1>Enter your username and password to login: </h1>

        <input className='concInfoInps' id='username' placeholder='Enter username' autoFocus />

        <br />
        <br />

        <input type='password' className='concInfoInps' id='password' placeholder='Enter password' />

        <br />
        <br />

        <button onClick={login} className='loginBtn' id='loginBtn'>Login</button>

        <br />
        <br />

        <p onClick={renderSignUp}>Sign up here</p>
      </div>
    );
  }
}

export default Login;
