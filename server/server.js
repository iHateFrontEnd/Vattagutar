const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
var usersFile = require('./users.json');
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
            userindex: userindex,
            friends: usersfile.users[userindex].friends,
            groups: usersfile.users[userindex].groups
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

    res.json({
        groups: usersFile.users[userIndex].groups,
        friends: usersFile.users[userIndex].friends
    })
});

//friend request
app.post('/friend-request', (req, res) => {

});

//join group
app.post('/join-group', (req, res) => {
});


app.listen(4000);
