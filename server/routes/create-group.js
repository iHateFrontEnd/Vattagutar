const express = require('express');
const router = express.Router();
const groupsFile = require('../groups.json');
const usersFile = require('../users.json');
var configFile = require('../config.json');
const fs = require('fs');

router.post('/', (req, res) => {
    const username = req.body.username;
    const groupName = req.body.groupName;
    const userIndex = req.body.userIndex;

    //for groups.json
    groupsFile.groups.push(groupName);

    fs.writeFile('./groups.json', JSON.stringify(groupsFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    //for users.json
    usersFile.users[userIndex].groups.push(groupName);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    //create a group file in /groups
    configFile.groupChatLayout.permittedUsers.push(username);

    fs.writeFile(`./groups/${groupName}.json`, JSON.stringify(configFile.groupChatLayout, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;