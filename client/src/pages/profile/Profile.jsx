import React from 'react';
import ReactDOM from 'react-dom';
import userLogo from '../../assets/user-icon.png';
import Homepage from '../../components/homepage/Homepage'
import Logo from '../../components/homepage/Logo';
import configFile from '../../config.json';
import './Profile.css';

var user = JSON.parse(localStorage.getItem('user'));

async function saveNewUsername() {
    const username = document.getElementById('username').value;

    if (username != '') {
        //saving username in users.json
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                userIndex: user.userIndex
            })
        }

        await fetch(`${configFile.serverURL}/change-username`, options);

        //saving in localStorage
        user.username = username;

        localStorage.setItem('user', JSON.stringify(user));

        await window.location.reload();
    } else {
        alert('Please enter a proper username');
    }
}

async function saveNewPassword() {
    const password = document.getElementById('password').value;

    //saving password in users.json
    if (password != '') {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                userIndex: user.userIndex
            })
        }

        await fetch(`${configFile.serverURL}/change-password`, options);

        //saving in localStorage
        user.password = password;

        localStorage.setItem('user', JSON.stringify(user));

        await window.location.reload();
    } else {
        alert('Please enter a proper password');
    }
}

function renderHomepage() {
    ReactDOM.render(
        <Homepage frame={Logo} />, document.getElementById('root')
    );
}

export default class IncomingRequests extends React.Component {
    render() {
        return (
            <div className='profileContainer' id='profileContainer'>
                <img src={userLogo} />

                <br />

                <h1>Change your username: </h1>

                <br />

                <div className='editUserData'>
                    <input type='text' placeholder='Change your username' id='username' className='newUserData' />

                    &nbsp;

                    <button className='saveNewDataBtn' onClick={saveNewUsername}>Save</button>
                </div>

                <br />
                <br />

                <h1>Change your password: </h1>

                <br />

                <div className='editUserData'>
                    <input type='password' placeholder='Change your password' id='password' className='newUserData' />

                    &nbsp;

                    <button className='saveNewDataBtn' onClick={saveNewPassword}>Save</button>
                </div>

                <br />
                <br />

                <button className='loginBtn' onClick={renderHomepage}>Home</button>
            </div>
        );
    }
}
