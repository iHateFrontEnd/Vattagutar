const express = require('express');
const cors = require('cors');
const app = express();
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

//importing routes
const loginRoute = require('./routes/login');
const signUpRoute = require('./routes/sign-up');
const loadChat = require('./routes/load-chat');
const friendRequest = require('./routes/add-friend');
const joinGroup = require('./routes/join-group');
const createGroup = require('./routes/create-group');
const changeUsername = require('./routes/change-username');
const changePassword = require('./routes/change-password');
const loadFriendRequests = require('./routes/load-friend-requests');
const declineRequest = require('./routes/decline-request');
const addPerson = require('./routes/add-person');
const leaveGroup = require('./routes/leave-group');
const removeUser = require('./routes/remove-user');
const unFriendUser = require('./routes/un-friend-user');
const loadGroupData = require('./routes/load-group-data')
const allowUsers = require('./routes/allow-users');
const clearDmChat = require('./routes/clear-dm-chat');
const clearGroupChat = require('./routes/clear-group-chat');

app.get('/', (req, res) => {
  res.json('Hello world');
});

//loggin in a user
app.use('/login', loginRoute);

//load group data
app.use('/load-group-data', loadGroupData);

//creating a new user
app.use('/sign-up', signUpRoute);

//send chat data
app.use('/load-chat', loadChat);

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

//declining a request
app.use('/decline-request', declineRequest);

//adding people to a group
app.use('/add-person', addPerson);

//leaving group 
app.use('/leave-group', leaveGroup);

//kicking / removing user out of the group
app.use('/remove-user', removeUser);

//unfriending a user
app.use('/un-friend-user', unFriendUser);

//allowing a user who requested to join a group
app.use('/allow-user', allowUsers);

//clearing dm chat
app.use('/clear-dm-chat', clearDmChat);

//clearing group chat 
app.use('/clear-group-chat', clearGroupChat);

app.listen(process.env.PORT || 4000, () => console.log('express server'));
