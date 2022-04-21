import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Homepage from '../../components/homepage/Homepage';
import Logo from '../../components/homepage/Logo';
import './Requests.css';

var friendRequestsArr = [];

const user = JSON.parse(localStorage.getItem('user'));
var chatData = JSON.parse(localStorage.getItem('chatData'));

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
    ReactDOM.render(
        <Homepage frame={Logo} />, document.getElementById('root')
    );
}

//accepting friend requests
async function acceptRequest(acceptedUserIndex, acceptedUsername) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            toAcceptUser: acceptedUsername,
            userIndex: user.userIndex,
            toAcceptUserIndex: acceptedUserIndex
        })
    }

    await fetch(`${configFile.serverURL}/accept-request`, options);

    chatData.friends.push(acceptedUsername);
    localStorage.setItem('chatData', JSON.stringify(chatData));

    await window.location.reload();
}

//decling friend requests
async function declineRequest(declinedUserIndex) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userIndex: user.userIndex,
            toDeclineUserIndex: declinedUserIndex
        })
    }

    await fetch(`${configFile.serverURL}/decline-request`, options);

    await window.location.reload();

    await loadFriendRequests();
}

//loading friend requests
export default async function loadFriendRequests() {
    let user = JSON.parse(localStorage.getItem('user'));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userIndex: user.userIndex
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

                    <button onClick={() => acceptRequest(i, data.requests[i])} className='accept'>✓</button>

                    <button onClick={() => declineRequest(i)} className='decline'>X</button>
                </div>

                <br />
                <br />
            </>
        );
    }

    await ReactDOM.render(
        <Requests requests={friendRequestsArr} />, document.getElementById('root')
    );
}
