const express = require('express');
const router = express.Router();
const usersFile = require('../users.json');
const fs = require('fs');

router.post('/', (req, res) => {
    //f refers to friend        
    const userIndex = parseInt(req.body.userIndex);
    const username = req.body.username;
    const fUsername = req.body.fUsername;

    var fUserFound = false;
    var fUserIndex = -1;

    //checking if friend exists
    for (let i = 0; i <= usersFile.users.length - 1; i++) {
        fUserIndex++;

        if (usersFile.users[i].username == fUsername) {
            fUserFound = true;
            break;
        }
    }

    if (fUserFound == true) {
        res.json({
            status: 'success',
        });

        //writing to incoming requests
        usersFile.users[userIndex].sentRequest.push(fUsername);

        //wrirting to sentRequests
        usersFile.users[fUserIndex].incomingRequests.push(username);

        fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
    } else {
        res.json({
            status: 'failed',
            reason: 'friend not found'
        });
    }

    res.end();
});

module.exports = router;