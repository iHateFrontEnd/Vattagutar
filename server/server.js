const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: { origin: "*" }
  }
});
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);

//websocket
io.on('connection', function (socket) {
  socket.on('update-message', function (groupName) {
    const group = require(`./groups/${groupName}.json`);

    const chat = group.chat;

    socket.emit('chat', chat);
  });
});

//importing routes
const loginRoute = require('./routes/login');
const signUpRoute = require('./routes/sign-up');
const loadChatData = require('./routes/load-chat-data');
const friendRequest = require('./routes/add-friend');
const joinGroup = require('./routes/join-group');
const createGroup = require('./routes/create-group');
const changeUsername = require('./routes/change-username');
const changePassword = require('./routes/change-password');
const loadFriendRequests = require('./routes/load-friend-requests');
const acceptRequest = require('./routes/accept-request');
const declineRequest = require('./routes/decline-request');
const saveGroupChat = require('./routes/save-group-chat');
const reloadChat = require('./routes/reload-chat');
const addPerson = require('./routes/add-person');
const loadGroups = require('./routes/load-groups');

app.get('/', (req, res) => {
  res.send('Hello world');
});

//sending the latest msg to clients connected to server
app.use('/reload-chat', reloadChat);

//loggin in a user
app.use('/login', loginRoute);

//creating a new user
app.use('/sign-up', signUpRoute);

//send chat data
app.use('/load-chat-data', loadChatData);

//friend request
app.use('/friend-request', friendRequest);

//join group
app.use('/join-group', joinGroup);

//creates a group
app.use('/create-group', createGroup);

//changing username
app.use('/change-username', changeUsername);

//changing password 
app.use('/change-password', changePassword);

//loading friend requests
app.use('/load-friend-requests', loadFriendRequests);

//accepting a friend request
app.use('/accept-request', acceptRequest);

//declining a request
app.use('/decline-request', declineRequest);

//saving group chat to a .json file
app.use('/save-group-chat', saveGroupChat);

//adding people to a group
app.use('/add-person', addPerson);

//loading groups
app.use('/load-groups', loadGroups);

http.listen(4000);
