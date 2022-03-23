import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import CreateGroup from '../create-group/CreateGroup';
import Homepage from '../homepage/Homepage';
import '../../App.css';

//this function sends a request to join a group
async function requestToJoin() {
    const groupName = document.getElementById('groupName').value;
    const user = JSON.parse(localStorage.getItem('user'));

    if (groupName != '') {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupName: groupName,
                username: user.username
            })
        }

        const res = await fetch(`${configFile.serverURL}/join-group`, options);
        const data = await res.json();

        if (data.status === 'success') {
            alert('Request was sent!');
        } else {
            alert(`Group ${groupName} is not found, please try again with a proper group name`);

            console.log(data);
        }
    } else {
        alert('Please enter a proper group name');
    }
};

function renderCreateGroup() {
    ReactDOM.render(
        <Homepage frame={CreateGroup} />, document.getElementById('root')
    );
}

const JoinGroup = (
    <div className='joinGroup' id='joinGroup'>
        <h1>Enter group name to join: </h1>

        <input className='concInfoInps' id='groupName' placeholder='Enter group name' />

        <br />
        <br />
        <br />

        <button className='loginBtn' onClick={requestToJoin}>Send request</button>

        <br />
        <br />

        <button className='loginBtn' onClick={renderCreateGroup}>Create a group</button>
    </div>
);


export default JoinGroup;
