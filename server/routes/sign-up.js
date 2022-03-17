const express = require('express');
const router = express.Router();
const configFile = require('../config.json');
const usersFile = require('../users.json');
const fs = require('fs');

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userLayout = configFile.userLayout;

    usersFile.users.push(userLayout);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;
