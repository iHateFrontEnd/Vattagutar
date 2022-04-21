const express = require('express');
const router = express.Router();

function loadGroupChat(groupName, res) {
    let groupFile = require(`../groups/${groupName}.json`);

    res.send({
        permittedUsers: groupFile.permittedUsers,
        requestedUsers: groupFile.requestedUsers,
        chat: groupFile.chat,
        groupName: groupName
    });
}

router.post('/', (req, res) => {
    if (req.body.toLoad == 'group') {

        loadGroupChat(req.body.groupName, res);
    } else {
        // loadPersonalChat();
    }
});

module.exports = router;
