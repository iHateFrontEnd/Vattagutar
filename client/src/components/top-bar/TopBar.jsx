import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from '../homepage/Homepage';
import Logo from '../homepage/Logo';
import Login from '../login/Login';
import Profile from '../../pages/profile/Profile';
import loadFriendRequests from '../../pages/requests/Requests';
import './TopBar.css';

function renderProfile() {
  ReactDOM.render(
    <Profile />, document.getElementById('root')
  );
}

function signOut() {
  localStorage.clear();
  sessionStorage.clear();

  ReactDOM.render(
    <Login />, document.getElementById('root')
  );
}

export default class TopBar extends React.Component {
  render() {
    return (
      <div className="topBar">
        <button className='topBarBtns' onClick={signOut}>Sign out</button>
        <button className='topBarBtns' onClick={loadFriendRequests}>Incoming friend requests</button>
        <button className='topBarBtns' onClick={renderProfile}>Profile</button>
      </div>
    );
  }
}
