const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
var usersFile = require('./users.json');
var groupsFile = require('./groups.json');
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

//importing routes
const loginRoute = require('./routes/login');
const signUpRoute = require('./routes/sign-up');
const loadChatData = require('./routes/load-chat-data');
const friendRequest = require('./routes/add-friend');
const joinGroup = require('./routes/join-group');
const createGroup = require('./routes/create-group');
const changeUsername = require('./routes/change-username');
const changePassword = require('./routes/change-password');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

//changin password 
app.use('/change-password', changePassword);

app.listen(4000);

