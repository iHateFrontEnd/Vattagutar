import React from "react";
import ReactDOM from "react-dom";
import Settings from "./Settings";
import Homepage from "../../homepage/Homepage";
import renderChat from "../../../renderChat";
import loadGroupData from "../../../loadGroupData";
import configFile from '../../../config.json';
import './Settings.css';

var requestedUsers = [];

loadGroupData();

const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

try {
  if (currentGroupData.requestedUsers.length === 0) {
    requestedUsers.push(
      <li>Nobody yet has made request :(</li>
    );
  } else {
    var i = -1;

    currentGroupData.requestedUsers.map(username => {
      i++;

      requestedUsers.push(
        <div key={i} className='user'>
          <p className='username'>{username}</p>

          <button className='allow-user' onClick={() => allowUser(i)}>✓</button>
        </div>
      );
    });
  }
} catch (err) {
  console.log(err);
}

function allowUser(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      groupName: currentGroupData.groupName,
      username: currentGroupData.requestedUsers[user]
    })
  }

  fetch(`${configFile.serverURL}/allow-user`, options);

  alert(`${currentGroupData.requestedUsers[user]} is now a part of this group!`);

  renderChat(i, 'network', 'groups', null);
}

function back() {
  ReactDOM.render(
    <Homepage frame={<Settings />} />, document.getElementById('root')
  );
}

export default class RequestedUsers extends React.Component {
  render() {
    return (
      <div className='group-members-container'>
        <h1>Users who requested are: </h1>

        <ul>
          {requestedUsers}
        </ul>

        <div className='back-btn-container'>
          <button className='back-btn' onClick={back}>Back</button>
        </div>
      </div>
    );
  }
}
