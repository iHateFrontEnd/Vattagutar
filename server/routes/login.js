const express = require('express');
const router = express.Router();
const usersFile = require('../users.json');

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    var userIndex = -1;
    var userFound = false;

    for (let i = 0; i <= usersFile.users.length - 1; i++) {
        userIndex++;

        if (usersFile.users[i].username === username && usersFile.users[i].password === password) {
            userFound = true;
            break;
        }
    }

    if (userFound == true) {
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

module.exports = router;
