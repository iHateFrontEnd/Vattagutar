import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import CreateGroup from '../create-group/CreateGroup';
import Homepage from '../homepage/Homepage';
import '../../App.css';

//this function sends a request to join a group
function requestToJoin() {
    const groupName = document.getElementById('root').value;

    if (groupName != '') {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupName: groupName
            })
        }

        fetch(`${configFile.serverURL}/join-group`, options);
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
