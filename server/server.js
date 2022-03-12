const express = require('express');
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

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//allowing the user to login
app.post('/login', urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    var userIndex = -1;
    var userFound = false;

    for(let i = 0; i <= usersFile.users.length - 1; i++) {
        userIndex++;

        if(usersFile.users[i].username === username && usersFile.users[i].password === password) {
            userFound = true;
            break;
        }
    }

    if(userFound == true) {
        res.json({
            status: 'success',
            userIndex: userIndex,
            friends: usersFile.users[userIndex].friends,
            groups: usersFile.users[userIndex].groups
        });
    } else {
        res.json({
            status: 'failed',
            reason: 'user not found'
        });
    }

    res.end();
});

//creating a new user
app.post('/sign-up', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userLayout = {
        username: username,
        password: password,
        friends: [],
        groups: []
    }

    usersFile.users.push(userLayout);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if(err) {
            console.log(err);
        }
    });

    res.end();
});

//send chat data
app.post('/load-chat-data', (req, res) => {
    const userIndex = req.body.userIndex;

    const response = {
        groups: usersFile.users[userIndex].groups,
        friends: usersFile.users[userIndex].friends
    }

    res.send(response);
});

//friend request
app.post('/friend-request', (req, res) => {
    const fUserName = req.body.fUserName;

    for(let i = 0; i <= usersFile.user.length; i++) {
        //search users
    }

    res.end();
});

//join group
app.post('/join-group', (req, res) => {
    const groupName = req.body.groupName;

    res.end();
});

//creates a group
app.post('/create-group', (req, res) => {
    console.log(req.body);

    const groupName = req.body.groupName;
    const userIndex = req.body.userIndex;

    //for groups.json
    groupsFile.groups.push(groupName);

    fs.writeFile('./groups.json', JSON.stringify(groupsFile, null, 2), (err) => {
        if(err) {
            console.log(err);
        }
    });

    //for users.json
    usersFile.users[userIndex].groups.push(groupName);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if(err) {
            console.log(err);
        }
    });

    res.end();
});

app.listen(4000);
