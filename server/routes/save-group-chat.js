const express = require('express');
const router = express.Router();
const fs = require('fs');
const usersFile = require('../users.json');

router.post('/', (req, res) => {
    const groupName = req.body.groupName;
    const username = req.body.username;
    const rawMsg = req.body.msg;


    let group = require(`../groups/${groupName}.json`);

    group.chat.push({ [username]: rawMsg });

    fs.writeFile(`./groups/${groupName}.json`, JSON.stringify(group, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.end();
});

module.exports = router;