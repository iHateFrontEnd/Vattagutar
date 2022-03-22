const express = require('express');
const router = express.Router();
var configFile = require('../config.json');
var usersFile = require('../users.json');
const fs = require('fs');

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    var userLayout = configFile.userLayout;

    userLayout.username = username;
    userLayout.password = password;

    usersFile.users.push(userLayout);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;
