const express = require('express');
const router = express.Router();
const usersFile = require('../users.json');
const fs = require('fs');

router.post('/', (req, res) => {
    //f refers to friend        

    const userIndex = parseInt(req.body.userIndex);
    const fUsername = req.body.fUsername;

    var fUserFound = false;

    //checking if friend exists
    for (let i = 0; i <= usersFile.users.length - 1; i++) {
        if (usersFile.users[i].username == fUsername) {
            fUserFound = true;
            break;
        }
    }

    if (fUserFound == true) {
        //pass
    } else {
        res.json({
            status: 'failed',
            reason: 'friend not found'
        });
    }

    //writing to incoming requests
    usersFile.users[userIndex].incomingRequests.push(fUsername);

    fs.writeFile('../users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;
