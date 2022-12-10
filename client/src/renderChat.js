import configFile from './config.json';
import trimMsg from './trimMsg';

export default async function renderChat(index, toUse, chatType, setChat) {
  const renderGroupChat = () => {
    const toUseNetwork = async () => {
      const chatData = JSON.parse(localStorage.getItem('chatData'));

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toLoad: 'group',
          groupName: chatData.groups[index]
        })
      }

      const res = await fetch(`${configFile.serverURL}/load-chat`, options);
      const data = await res.json();

      await localStorage.setItem('currentGroupData', JSON.stringify({
        requestedUsers: data.requestedUsers,
        permittedUsers: data.permittedUsers,
        groupName: data.groupName
      }));

      trimMsg(data.chat, 'groups', null, toUse);
    }

    if (toUse === 'network') toUseNetwork();
    else if (toUse === 'storage') {
      const rawMsg = JSON.parse(sessionStorage.getItem('rawMsg'));

      trimMsg(rawMsg, 'groups', setChat, toUse);
    }
  }

  const renderDmChat = () => {
    const toUseNetwork = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const chatData = JSON.parse(localStorage.getItem('chatData'));

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toLoad: 'dm',
          username: user.username,
          fUsername: chatData.friends[index].username,
        })
      }

      const res = await fetch(`${configFile.serverURL}/load-chat`, options);
      const data = await res.json();

      localStorage.setItem('currentDmData', JSON.stringify({
        chattingWith: chatData.friends[index].username
      }));

      trimMsg(data.chat, 'dm', null);
    }

    if (toUse === 'network') toUseNetwork();
    else if (toUse === 'storage') {
      const dmRawMsg = JSON.parse(sessionStorage.getItem('dmRawMsg'));

      trimMsg(dmRawMsg, 'dm', setChat);
    }
  }

  if (chatType === 'groups') renderGroupChat();
  else if (chatType === 'dm') renderDmChat();
}
