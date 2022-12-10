import React from "react";
import { createRoot } from 'react-dom/client';
import Homepage from '../../homepage/Homepage';
import Logo from "../../homepage/Logo";
import configFile from '../../../config.json';

var currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

var permittedUsers = [];

function removeUser(index) {
  const toRemoveUser = currentGroupData.permittedUsers[index];

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      toRemoveUser: toRemoveUser,
      groupName: currentGroupData.groupName
    })
  }

  fetch(`${configFile.serverURL}/remove-user`, options);

  currentGroupData.permittedUsers.splice(index, 1);
  localStorage.setItem('currentGroupData', JSON.stringify(currentGroupData));

  const root = createRoot(document.getElementById('root'));
  root.render(<Homepage frame={<Logo />} />);

  alert('User successfully kicked :)');
}

try {
  for (let i = 0; i <= currentGroupData.permittedUsers.length - 1; i++) {
    permittedUsers.push(
      <div key={i} className='user'>
        <p className='username'>{currentGroupData.permittedUsers[i]}</p>

        <button className='remove-user-btn' onClick={() => { removeUser(i) }}>X</button>
      </div >
    );
  }
} catch (err) {
  console.log(err);
}


export default class RemovePeople extends React.Component {
  render() {
    return (
      <div className='remove-users-containter'>

        <h1>Kick some users/people/friends from your group!   </h1>

        {permittedUsers}
      </div>
    );
  }
}