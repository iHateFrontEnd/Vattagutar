import configFile from './config.json';

export default async function loadChatData(user) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password,
            userIndex: user.userIndex
        })
    }

    const res = await fetch(`${configFile.serverURL}/load-chat-data`, options);
    const chatData = await res.json();

    sessionStorage.setItem('chatData', JSON.stringify({
        friends: chatData.friends,
        groups: chatData.groups
    }));
}
