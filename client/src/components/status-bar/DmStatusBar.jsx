import React from 'react';
import { createRoot } from 'react-dom/client';
import Hompage from '../homepage/Homepage';
import Logo from '../homepage/Logo';
import configFile from '../../config.json';
import renderChat from '../../renderChat';
import './StatusBar.css';

const currentDmData = JSON.parse(localStorage.getItem('currentDmData'));
var chatData = JSON.parse(localStorage.getItem('chatData'));
const user = JSON.parse(localStorage.getItem('user'));

function unFriend() {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: user.username,
      fUsername: currentDmData.chattingWith
    })
  }

  fetch(`${configFile.serverURL}/un-friend-user`, options);

  //modifying localStorage
  for (let i = 0; i <= chatData.friends.length; i++) {
    if (chatData.friends[i].username === currentDmData.chattingWith) {
      alert(`You have removed ${currentDmData.chattingWith} from your friends list`);

      chatData.friends.splice(i, 1);
      localStorage.setItem('chatData', JSON.stringify(chatData));
      localStorage.removeItem('currentDmData');
      break;
    }
  }

  const root = createRoot(document.getElementById('root'));
  root.render(<Hompage frame={Logo} />);
}

function clearChat() {
  //finding collection name 
  var collectionName;

  for (var i = 0; i <= chatData.friends.length; i++) {
    if (chatData.friends[i].username == currentDmData.chattingWith) {
      collectionName = chatData.friends[i].collectionName;
      break;
    }
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      collectionName: collectionName
    })
  }

  fetch(`${configFile.serverURL}/clear-dm-chat`, options);

  alert('Your chat has been cleared');

  renderChat(i, 'network', 'dm', null);
}

export default class DmChatStatusBar extends React.Component {
  render() {
    return (
      <div className='dm-status-bar'>
        <h4>Chatting with: {this.props.fUsername}</h4>

        <button className='statusBarBtns' onClick={unFriend}>un-friend</button>

        <button className='statusBarBtns' onClick={clearChat}>Clear chat</button>
      </div>
    );
  }
}
