import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Logo from '../homepage/Logo';
import Homepage from '../homepage/Homepage';
import '../../App.css';

//sending friend request data to server
async function sendFriendRequest() {
  const friendsUsername = document.getElementById('friendsUsername').value;
  const user = JSON.parse(localStorage.getItem('user'));

  if (friendsUsername === user.username) {
    alert('Please enter your friends username not yours');
  } else if (friendsUsername === '') {
    alert('Please enter a proper username');
  } else {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userIndex: user.userIndex,
        fUsername: friendsUsername,
        username: user.username
      })
    }

    const res = await fetch(`${configFile.serverURL}/friend-request`, options);
    const data = await res.json();

    if (data.status === 'success') {
      alert('Request was sent!');
    } else {
      alert(`Try again with a proper username, user ${friendsUsername} does not exits :(`);
    }
  }
}

const AddFriend = (
  <div className='addFriend' id='addFriend'>
    <h1>Enter your friend's username: </h1>

    <input type='text' id='friendsUsername' className='concInfoInps' placeholder="Enter friend's username" />

    <br />
    <br />

    <button onClick={sendFriendRequest} className='loginBtn'>Send friend request</button>
  </div>
);

export default AddFriend;
