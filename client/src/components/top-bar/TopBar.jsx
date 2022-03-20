import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from '../homepage/Homepage';
import Logo from '../homepage/Logo';
import Login from '../login/Login';
import IncomingRequests from '../../pages/IncomingRequests'; 

function renderProfile() {
    ReactDOM.render(
        <IncomingRequests />, document.getElementById('root')
    );
}

function renderRequests() {
    
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
                <img className='topBarBtns' onClick={signOut} alt='Sign out' />
                <img className='topBarBtns' onClick={renderRequests} alt='Incoming friend requests' />
                <img className='topBarBtns' onClick={renderProfile} alt='Profile' />
            </div>
        );
    }
}
