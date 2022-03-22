const express = require('express');
const router = express.Router();

router.post('/load-chat-data', (req, res) => {
    const userIndex = req.body.userIndex;

    const response = {
        groups: usersFile.users[userIndex].groups,
        friends: usersFile.users[userIndex].friends
    }

    res.send(response);
});

module.exports = router;
