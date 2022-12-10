import React from "react";
import ReactDOM from "react-dom";
import loadGroupData from "../../../loadGroupData";
import Settings from "./Settings";
import Homepage from "../../homepage/Homepage";
import './Settings.css';

var permittedUsers = [];

loadGroupData();

const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

try {
  currentGroupData.permittedUsers.map(users => {
    permittedUsers.push(
      <li key={users} className='users'>{users}</li>
    );
  })
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
