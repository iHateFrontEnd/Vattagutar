const express = require('express');
const router = express.Router();
const fs = require('fs');
const usersFile = require('../users.json');

router.post('/', (req, res) => {
    const userIndex = req.body.userIndex;

    res.json({
        requests: usersFile.users[userIndex].incomingRequests
    });

    console.log('done');

    res.end();
});

module.exports = router;
