import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Localbase from 'localbase';
import Homepage from './Homepage';
import GroupChat from '../group-chat/GroupChat';

export default async function renderGroupChat(groupIndex) {
    const rawMsg = JSON.parse(sessionStorage.getItem('rawMsg'));

    const chatData = JSON.parse(localStorage.getItem('chatData'));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            toLoad: 'group',
            groupName: chatData.groups[groupIndex]
        })
    }


    const res = await fetch(`${configFile.serverURL}/load-chat-data`, options);
    const data = await res.json();

    await localStorage.setItem('currentGroupData', JSON.stringify({
        requestedUsers: data.requestedUsers,
        permittedUsers: data.permittedUsers,
        groupName: data.groupName
    }));

    trimMsg(data);
}

function trimMsg(data) {
    var stringMsg = new Object;

    stringMsg = JSON.stringify(data.chat);

    var trimedMsg = stringMsg.replaceAll('"', '');
    trimedMsg = trimedMsg.replaceAll('[', '');
    trimedMsg = trimedMsg.replaceAll(']', '');
    trimedMsg = trimedMsg.replaceAll('}', '');
    trimedMsg = trimedMsg.replaceAll('{', '');
    trimedMsg = trimedMsg.replaceAll(':', ' : ');

    var msgArr = [];
    var rawMsg = [];

    rawMsg.push(trimedMsg.split(','));

    sessionStorage.setItem('rawMsg', stringMsg);

    for (let i = 0; i <= rawMsg[0].length; i++) {
        msgArr.push(
            <p>
                {rawMsg[0][i]}
            </p>
        );
    }

    ReactDOM.render(
        <Homepage frame={GroupChat(msgArr)} />, document.getElementById('root')
    );
}