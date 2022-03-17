import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Logo from '../homepage/Logo';
import Homepage from '../homepage/Homepage';
import '../../App.css';

//sending friend request data to server
async function sendFriendRequest() {
    const friendsUsername = document.getElementById('friendsUsername').value;

    if (friendsUsername != '') {
        let user = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fUsername: friendsUsername,
                userIndex: user.userIndex
            })
        }

        const res = await fetch(`${configFile.serverURL}/friend-request`, options);
        const isRequestSent = await res.json();

        if (isRequestSent === true) {
            alert('Request was sent');

            ReactDOM.render(
                <Homepage frame={Logo} />, document.getElementById('root')
            );
        } else {
            alert(`There is no such user name ${friendsUsername}, please try again with a proper username`);
        }
    } else {
        alert('Please enter a proper username');
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
