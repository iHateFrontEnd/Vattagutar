const express = require('express');
const router = express.Router();
const fs = require('fs');
var usersFile = require('../users.json');

router.post('/', (req, res) => {
    const userIndex = req.body.userIndex;
    const toAcceptUser = req.body.toAcceptUser
    const toAcceptUserIndex = req.body.toAcceptUserIndex;

    //removing from incomingRequests
    usersFile.users[userIndex].incomingRequests.splice(toAcceptUserIndex, 1);

    //adding to friends
    usersFile.users[userIndex].friends.push(toAcceptUser);


    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;