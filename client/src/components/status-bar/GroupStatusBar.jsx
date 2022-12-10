import React from 'react';
import { createRoot } from 'react-dom/client';
import AddPeople from '../group-chat/AddPeople';
import Homepage from '../homepage/Homepage';
import Settings from '../group-chat/settings/Settings';
import Logo from '../homepage/Logo';
import configFile from '../../config.json';
import './StatusBar.css';

const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

function addPeople() {
  const root = createRoot(document.getElementById('root'));
  root.render(<Homepage frame={<AddPeople />} />);
}

async function leaveGroup() {
  const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));
  const user = JSON.parse(localStorage.getItem('user'));

  //changing the users.json file using server
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      groupName: currentGroupData.groupName,
      username: user.username
    })
  }

  const res = await fetch(`${configFile.serverURL}/leave-group`, options);
  const data = await res.json();

  localStorage.setItem('chatData', JSON.stringify(data));

  const root = createRoot(document.getElementById('root'));
  root.render(<Homepage frame={Logo} />);
}

function renderSettings() {
  const root = createRoot(document.getElementById('root'));
  root.render(<Homepage frame={<Settings />} />);
}

export default class GroupStatusBar extends React.Component {
  render() {
    return (
      <div className='groupStatusBar'>
        <h4>{this.props.groupName}</h4>

        <button className='statusBarBtns' onClick={addPeople}>Add people</button>

        <button className='statusBarBtns' onClick={leaveGroup}>Leave</button>

        <button className='statusBarBtns' onClick={renderSettings}>Settings</button>
      </div>
    );
  }
}
