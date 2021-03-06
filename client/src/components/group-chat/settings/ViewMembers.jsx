import React from "react";
import ReactDOM from "react-dom";
import Settings from "./Settings";
import Homepage from "../../homepage/Homepage";
import './Settings.css';

const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

var permittedUsers = [];

try {
  for (let i = 0; i <= currentGroupData.permittedUsers.length - 1; i++) {
    permittedUsers.push(
      <li key={i} className='users'>{currentGroupData.permittedUsers[i]}</li>
    );
  }
} catch (err) {
  console.log(err);
}

function back() {
  ReactDOM.render(
    <Homepage frame={<Settings />} />, document.getElementById('root')
  );
}

export default class ViewMembers extends React.Component {
  render() {
    return (
      <div className='group-members-container'>
        <h1>Members of the group!</h1>

        <ul>
          {permittedUsers}
        </ul>

        <div className='back-btn-container'>
          <button className='back-btn' onClick={back}>Back</button>
        </div>
      </div>
    );
  }
}