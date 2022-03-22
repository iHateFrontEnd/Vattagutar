const express = require('express');
const router = express.Router();
const fs = require('fs');
var usersFile = require('../users.json');

router.post('/', (req, res) => {
    const userIndex = req.body.userIndex;
    const toDeclineUserIndex = req.body.toDeclineUserIndex;

    //removing from incoming requests
    usersFile.users[userIndex].incomingRequests.splice(toDeclineUserIndex, 1);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;