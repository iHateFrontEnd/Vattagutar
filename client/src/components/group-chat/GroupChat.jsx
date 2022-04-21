import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Scrollbars from 'react-custom-scrollbars-2';
import StatusBar from '../status-bar/GroupStatusBar';
import renderGroupChat from '../homepage/renderGroupChat';
import Homepage from '../homepage/Homepage';
import configFile from '../../config.json';
import { Link } from 'react-scroll';
import { io } from 'socket.io-client';
import './GroupChat.css';

var msgArr = [];


export default function GroupChat(msgArr) {
  //updating the chat
  const updateChat = (username, msg) => {
    //scrolling to the bottom of the div

    const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));
    const user = JSON.parse(localStorage.getItem('user'));
    const chatData = JSON.parse(localStorage.getItem('chatData'));
    const groupName = currentGroupData.groupName;

    // updating chat
    const socket = io.connect(configFile.serverURL);

    socket.on('connect', data => {
      socket.emit('update-message', groupName);

      socket.on('chat', (chat) => {
        sessionStorage.setItem('rawMsg', JSON.stringify(chat));

        for (let i = 0; i <= chatData.groups.length; i++) {
          if (chatData.groups[i] === currentGroupData.groupName) {
            renderGroupChat(i);
            break;
          }
        }
      });
    });

  }

  const sendMsg = () => {
    const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));
    const user = JSON.parse(localStorage.getItem('user'));
    const typedMsg = document.getElementById('msg').value;
    const latestMsg = JSON.parse(localStorage.getItem('latestMsg'));

    //saving message to server
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        groupName: currentGroupData.groupName,
        msg: typedMsg,
        username: user.username
      })
    }

    fetch(`${configFile.serverURL}/save-group-chat`, options);

    var msgArr = JSON.parse(sessionStorage.getItem('rawMsg'));

    msgArr.push(
      {
        [user.username]: typedMsg
      }
    );

    sessionStorage.setItem('rawMsg', JSON.stringify(msgArr));

    //searching for groupIndex
    const groupData = JSON.parse(localStorage.getItem('chatData'));

    for (let i = 0; i <= groupData.groups.length; i++) {
      if (groupData.groups[i] === currentGroupData.groupName) {
        renderGroupChat(i);
        break;
      }
    }

    updateChat(user.username, typedMsg);
  }

  return (
    <div className='groupChat' id='groupChat'>
      {StatusBar()}

      <div className="chat" id='chat'>
        {msgArr}
      </div>

      <div className="enterMsg">
        <input placeholder='Type a message' type="text" id="msg" className="msg" />

        <button onClick={sendMsg} className='sendMsg'>Send</button>
      </div>
    </div>
  );
}
