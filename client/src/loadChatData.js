import configFile from './config.json';

export default async function loadChatData(user) {
    const options = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            userIndex: user.userIndex
        })
    }

    const res = await fetch(`${configFile.serverURL}/load-chat-data`, options);
    const chatData = await res.json();

    await localStorage.setItem('chatData', JSON.stringify({
        friends: chatData.friends,
        groups: chatData.groups
    }));
}
