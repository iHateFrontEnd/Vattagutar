import React from 'react';
import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import './GroupChat.css';

async function addPerson() {
  const toAddPerson = document.getElementById('personsUsername').value;

  if (toAddPerson != '') {

    const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupName: currentGroupData.groupName,
        toAdd: toAddPerson
      })
    }

    const res = await fetch(`${configFile.serverURL}/add-person`, options);
    const data = await res.json();

    if (data.status === 'failed') {
      alert(`User ${toAddPerson} does not exist :(, please try again with a proper username`);
    } else {
      alert(`User ${toAddPerson} is now a member of this group :)`);
    }
  } else {
    alert('Please enter a proper username');
  }
}

export default class AddPeople extends React.Component {
  render() {
    return (
      <div className="addPeople" id="addPeople">
        <h2 className='heading2'>Enter the person's username to add them</h2>

        <input type="text" id="personsUsername" placeholder='Enter a username' className="personsUsername" />

        <br />

        <button className='loginBtn' onClick={addPerson}>Add</button>
      </div>
    );
  }
}