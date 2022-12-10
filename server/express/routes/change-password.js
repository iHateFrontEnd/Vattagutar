const express = require('express');
const router = express.Router();
var usersFile = require('../../users.json');
const fs = require('fs');

router.post('/', (req, res) => {
    const password = req.body.password;
    const userIndex = req.body.userIndex;

    usersFile.users[userIndex].password = password;

    fs.writeFile('../users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;
