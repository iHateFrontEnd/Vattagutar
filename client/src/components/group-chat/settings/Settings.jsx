import React from 'react';
import { createRoot } from 'react-dom/client';
import ViewMembers from './ViewMembers';
import RequestedUsers from './RequestedUsers';
import RemovePeople from './RemovePeople';
import Homepage from '../../homepage/Homepage';
import configFile from '../../../config.json';
import renderChat from '../../../renderChat';
import './Settings.css';

const root = createRoot(document.getElementById('root'));

function renderRemovePeople() {
  root.render(<Homepage frame={<RemovePeople />} />);
}

function renderViewMembers() {
  root.render(<Homepage frame={<ViewMembers />} />);
}

function renderRequestedUsers() {
  root.render(<Homepage frame={<RequestedUsers />} />);
}

function clearChat() {
  const chatData = JSON.parse(localStorage.getItem('chatData'));
  const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

  var groupName;

  for (var i = 0; i <= chatData.groups.length; i++) {
    if (chatData.groups[i] == currentGroupData.groupName) {
      groupName = chatData.groups[i];
      break;
    }
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      collectionName: groupName
    })
  }

  fetch(`${configFile.serverURL}/clear-group-chat`, options);

  alert('All the messages in the group in deleted');

  renderChat(i, 'network', 'groups', null);
}

export default class Settings extends React.Component {
  render() {
    return (
      <div className='settings' id='settings'>
        <h1>◦ Mess with some group settings!</h1>

        <h2 className='groupName-heading'>➫ Have a look at the users who want to be a part of this group: </h2>
        <button className='settings-btn' onClick={renderRequestedUsers}>Check it out!</button>

        <h2 className='groupName-heading'>➫ Check out the members of this group: </h2>
        <button className='settings-btn' onClick={renderViewMembers}>Check it out!</button>

        <h2 className='groupName-heading'>➫ Remove some people from the group (for fun)</h2>
        <button className='settings-btn' onClick={renderRemovePeople}>Remove people</button>

        <h2 className='groupName-heading'>➫ Clear the chat history in this group:</h2>
        <button className='settings-btn' onClick={clearChat}>Clear history</button>
      </div>
    );
  }
}
