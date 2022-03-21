import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Logo from '../homepage/Logo';
import Homepage from '../homepage/Homepage';
import '../../App.css';

//sending friend request data to server
async function sendFriendRequest() {
<<<<<<< HEAD
    const friendsUsername = document.getElementById('friendsUsername').value;

    if (friendsUsername != '') {
        let user = JSON.parse(localStorage.getItem('user'));

=======
    const fUsername = document.getElementById('friendsUsername').value;
    let user = JSON.parse(localStorage.getItem('user'));

    if(fUsername === user.username) {
        alert("Please enter your friend's username not yours");
    } else if (fUsername === '') {
        alert('Please neter a proper username');
    } else {
>>>>>>> 1f0486b (Add friend is fixed)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
<<<<<<< HEAD
                fUsername: friendsUsername,
=======
                fUsername: fUsername,
>>>>>>> 1f0486b (Add friend is fixed)
                userIndex: user.userIndex
            })
        }

        const res = await fetch(`${configFile.serverURL}/friend-request`, options);
<<<<<<< HEAD
        const isRequestSent = await res.json();

        if (isRequestSent === true) {
            alert('Request was sent');
=======
        const data = await res.json();

        if(data.serverStatus === 200 && data.status === 'success') {
            alert('Request is sent');
>>>>>>> 1f0486b (Add friend is fixed)

            ReactDOM.render(
                <Homepage frame={Logo} />, document.getElementById('root')
            );
<<<<<<< HEAD
        } else {
            alert(`There is no such user name ${friendsUsername}, please try again with a proper username`);
        }
    } else {
        alert('Please enter a proper username');
=======
        } else if(data.status === 'failed' && data.reason === 'friend not found') {
            console.log(data);

            alert(`Please try again with a proper username, user ${fUsername} was not found :(`);
        }
>>>>>>> 1f0486b (Add friend is fixed)
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
