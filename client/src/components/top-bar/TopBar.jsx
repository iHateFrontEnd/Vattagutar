import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from '../homepage/Homepage';
import Logo from '../homepage/Logo';
import Login from '../login/Login';
<<<<<<< HEAD
import IncomingRequests from '../../pages/IncomingRequests'; 

function renderProfile() {
    ReactDOM.render(
        <IncomingRequests />, document.getElementById('root')
=======
import Profile from '../../pages/Profile'; 
import friendRequests from '../../pages/IncomingRequests';

function renderProfile() {
    ReactDOM.render(
        <Profile />, document.getElementById('root')
>>>>>>> 1f0486b (Add friend is fixed)
    );
}

function renderRequests() {
<<<<<<< HEAD
    
=======
    friendRequests();
>>>>>>> 1f0486b (Add friend is fixed)
}

function signOut() {
    localStorage.removeItem('chatData');
    localStorage.removeItem('user');

    ReactDOM.render(
        <Login />, document.getElementById('root')
    );
}

export default class TopBar extends React.Component {
    render() {
        return (
            <div className="topBar">
<<<<<<< HEAD
                <img className='topBarBtns' onClick={signOut} alt='Sign out' />
                <img className='topBarBtns' onClick={renderRequests} alt='Incoming friend requests' />
                <img className='topBarBtns' onClick={renderProfile} alt='Profile' />
=======
                <button className='topBarBtns' onClick={signOut}>Sign out</button>
                <button className='topBarBtns' onClick={renderRequests}>Incoming requests</button>
                <button className='topBarBtns' onClick={renderProfile}>Profile</button>
>>>>>>> 1f0486b (Add friend is fixed)
            </div>
        );
    }
}
