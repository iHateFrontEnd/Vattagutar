import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Logo from '../homepage/Logo';
import Homepage from '../homepage/Homepage';
import '../../App.css';


//sending friend request data to server
function sendFriendRequest() {
    const friendsUsername = document.getElementById('friendsUsername').value;

    if (friendsUsername != '') {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friend: friendsUsername
            })
        }

        fetch(`${configFile.serverURL}/friend-request`, options);

        ReactDOM.render(
            <Homepage frame={Logo} />, document.getElementById('root')
        );
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
