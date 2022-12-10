const io = require('socket.io')(5000, {
    cors: {
        origin: '*'
    },
});

//importing routes
const sendGroupsMsg = require('./routes/send-msg-groups');
const sendDmMsg = require('./routes/send-msg-dm');
const acceptRequest = require('./routes/accept-request');

io.on('connection', socket => {
    //updating msg's for gorup chat
    socket.on('send-msg-groups', (msg, username, typedMsg, groupName) => {
        sendGroupsMsg(username, typedMsg, groupName, io);
    });

    //updating msg's for dm chat
    socket.on('send-msg-dm', (msg, username, fUsername) => {
        sendDmMsg(msg, username, fUsername, io);
    });

    //accepting friend request 
    socket.on('accept-request', (toAcceptUser, username) => {
        acceptRequest(toAcceptUser, username, socket);
    });
});
