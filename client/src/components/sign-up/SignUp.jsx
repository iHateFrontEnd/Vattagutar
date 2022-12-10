import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Login from '../login/Login';
import './SignUp.css';

//sending user data to save user
function signUp() {
  const username = document.getElementById('username').value;
  const enterPwd = document.getElementById('enterPwd').value;
  const confirmPwd = document.getElementById('confirmPwd').value;

  if (username != '' && enterPwd === confirmPwd && enterPwd != '') {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: enterPwd
      })
    }

    fetch(`${configFile.serverURL}/sign-up`, options);

    ReactDOM.render(
      <Login />, document.getElementById('root')
    );
  } else {
    alert('Please check the form that you entered');
  }
}

class SignUp extends React.Component {
  render() {
    return (
      <div className='signUp' id='signUp'>
        <h1>Enter your new username and password</h1>

        <input type='text' id='username' className='concInfoInps' placeholder='Enter your new username' autoFocus required />

        <br />
        <br />

        <input type='password' className='concInfoInps' id='enterPwd' placeholder='Enter your new password' required />

        <br />
        <br />

        <input type='password' className='concInfoInps' id='confirmPwd' placeholder='Confirm your password' required />

        <br />
        <br />

        <button className='signUpBtn' onClick={signUp}>Sign up</button>
      </div>
    );
  }
}

export default SignUp;
