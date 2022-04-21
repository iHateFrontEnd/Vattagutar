import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login/Login.jsx';
import Homepage from './components/homepage/Homepage.jsx';
import configFile from './config.json';
import Logo from './components/homepage/Logo.js';

//this function loads all the  
async function loadGroups() {
  const user = JSON.parse(localStorage.getItem('user'));

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userIndex: user.userIndex
    })
  }

  console.log(configFile.serverURL);

  const res = await fetch(`http://localhost:4000/load-groups`, options);
  const data = await res.json();

  localStorage.setItem('chatData', JSON.stringify({
    groups: data.groups,
    friends: data.friends
  }));
}

function App() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.isLoggedIn === true) {
      loadGroups();

      return <Homepage frame={Logo} />;
    } else {
      return <Login />;
    }
  } catch (err) {
    return <Login />;
  }

}

export default App;
