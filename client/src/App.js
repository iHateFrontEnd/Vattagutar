import React from 'react';
import Login from './components/login/Login.jsx';
import Homepage from './components/homepage/Homepage.jsx'; import configFile from './config.json';
import Logo from './components/homepage/Logo.js';

//this function loads all the  
async function loadGroups(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: user.username,
      toLoad: 'chat-data'
    })
  }

  const res = await fetch(`${configFile.serverURL}/load-chat`, options);
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
      loadGroups(user);

      return <Homepage frame={Logo} />;
    } else {
      return <Login />;
    }
  } catch (err) {
    return <Login />;
  }
}

export default App;
