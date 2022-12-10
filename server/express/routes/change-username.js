const express = require('express');
const router = express.Router();
const fs = require('fs');
var usersFile = require('../../users.json');

router.post('/', (req, res) => {
    const username = req.body.username;
    const userIndex = req.body.userIndex;

    usersFile.users[userIndex].username = username;

    fs.writeFile('../users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;
