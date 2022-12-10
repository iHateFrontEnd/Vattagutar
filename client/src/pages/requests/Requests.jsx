import React from 'react';
import { createRoot } from 'react-dom/client';
import configFile from '../../config.json';
import Homepage from '../../components/homepage/Homepage';
import Logo from '../../components/homepage/Logo';
import { io } from 'socket.io-client';
import './Requests.css';

var friendRequestsArr = [];

const user = JSON.parse(localStorage.getItem('user'));

class Requests extends React.Component {
    render() {
        return (
            <div className='requestsContainer' id='requests'>
                <h1>Incoming requests: </h1>

                <br />

                {this.props.requests}
            </div>
        );
    }
}

//rendering homepage
function renderHomepage() {
    const root = createRoot(document.getElementById('root'));
    root.render(<Homepage frame={Logo} />);
}

const socket = io(configFile.websocketServerURL);

//accepting friend requests
function acceptRequest(acceptedUsername) {
    var chatData = JSON.parse(localStorage.getItem('chatData'));
    chatData.friends.push({
        username: acceptedUsername,
        collectionName: `${user.username}_${acceptedUsername}`
    });

    localStorage.setItem('chatData', JSON.stringify(chatData))

    socket.emit('accept-request', acceptedUsername, user.username);

    renderHomepage();
}

socket.on('added-friend', (username, fUsername) => {
    if (user.username === fUsername) {
        var chatData = JSON.parse(localStorage.getItem('chatData'));
        chatData.friends.push({
            username: username,
            collectionName: `${username}_${fUsername}`
        });

        localStorage.setItem('chatData', JSON.stringify(chatData));

        renderHomepage();
    }
});

//decling friend requests
async function declineRequest(declinedUserIndex) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            toDeclineUserIndex: declinedUserIndex
        })
    }

    await fetch(`${configFile.serverURL}/decline-request`, options);

    //await window.location.reload();

    await loadFriendRequests();
}

//loading friend requests
export default async function loadFriendRequests() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username
        })
    }

    const res = await fetch(`${configFile.serverURL}/load-friend-requests`, options);
    const data = await res.json();

    if (data.requests.length === 0) {
        friendRequestsArr.push(
            <>
                <h4>No incoming friend requests</h4>

                <button className='loginBtn' onClick={renderHomepage}>Home</button>
            </>
        );
    }

    for (let i = 0; i < data.requests.length; i++) {
        friendRequestsArr.push(
            <>
                <div className='requests'>
                    <h4>{data.requests[i]}</h4>

                    <button onClick={() => acceptRequest(data.requests[i])} className='accept'>✓</button>

                    <button onClick={() => declineRequest(i)} className='decline'>X</button>
                </div>

                <br />
                <br />
            </>
        );
    }

    const root = createRoot(document.getElementById('root'));
    await root.render(<Requests requests={friendRequestsArr} />);
}