import React from 'react';
import ReactDOM from 'react-dom';
import Scrollbars from 'react-custom-scrollbars-2';
import AddPeople from '../group-chat/AddPeople';
import Homepage from '../homepage/Homepage';
import './StatusBar.css';
import { useEffect } from 'react';


function addPeople() {
    ReactDOM.render(
        <Homepage frame={<AddPeople />} />, document.getElementById('root')
    );
}

function leaveGroup() {
    //write code to leave group
}

function renderSettings() {
    //make a settings page
}

export default function GroupStatusBar() {
    const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

    return (
        <div className='groupStatusBar'>
            <h4>{currentGroupData.groupName}</h4>

            <button className='statusBarBtns' onClick={addPeople}>Add people</button>

            <button className='statusBarBtns' onClick={leaveGroup}>Leave</button>

            <button className='statusBarBtns' onClick={renderSettings}>Settings</button>
        </div>
    );
}