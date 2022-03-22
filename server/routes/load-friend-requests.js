const express = require('express');
const router = express.Router();
const fs = require('fs');
const usersFile = require('../users.json');

router.post('/', (req, res) => {
    const userIndex = req.body.userIndex;

    const requests = usersFile.users[userIndex].incomingRequests;

    res.json({
        requests: requests
    });

    res.end();
});

module.exports = router;