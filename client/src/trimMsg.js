import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Homepage from './components/homepage/Homepage';
import GroupChat from './components/group-chat/GroupChat';
import DmChat from './components/dm-chat/DmChat';

export default function trimMsg(data, chatType, setChat) {
  var stringMsg = JSON.stringify(data);

  var trimedMsg = stringMsg.replaceAll('"', '');
  trimedMsg = trimedMsg.replaceAll('[', '');
  trimedMsg = trimedMsg.replaceAll(']', '');
  trimedMsg = trimedMsg.replaceAll('{', '');
  trimedMsg = trimedMsg.replaceAll(':', ' : ');

  var msgArr = [];
  var rawMsg = [];

  rawMsg.push(trimedMsg.split('},'));

  //removing } (this is the last charecter of all the msg's)
  rawMsg[0][rawMsg[0].length - 1] = rawMsg[0][rawMsg[0].length - 1].slice(0, -1) + '';

  console.log(rawMsg);

  if (chatType === 'groups') sessionStorage.setItem('rawMsg', stringMsg);
  else if (chatType === 'dm') sessionStorage.setItem('dmRawMsg', stringMsg);

  for (let i = 0; i <= rawMsg[0].length; i++) {
    msgArr.push(
      <p key={i}>
        {rawMsg[0][i]}
      </p>
    );
  }

  const root = createRoot(document.getElementById('root'));

  if (chatType === 'dm') {

    if (setChat === null) {
      root.render(<Homepage frame={<DmChat chat={msgArr} />} />);
    } else {
      setChat(msgArr);
    }
  } else {
    if (setChat === null) {
      root.render(<Homepage frame={<GroupChat chat={msgArr} />} />);
    } else {
      setChat(msgArr);
    }
  }
}
