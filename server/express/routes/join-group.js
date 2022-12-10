const express = require('express');
const router = express.Router();
const fs = require('fs');
const groupsFile = require('../../groups.json');

router.post('/', (req, res) => {
    const groupName = req.body.groupName;
    const username = req.body.username;

    //checking if group exists
    var groupFound = false;
    var groupIndex = -1;

    for (let i = 0; i <= groupsFile.groups.length; i++) {
        groupIndex++;

        if (groupsFile.groups[i] == groupName) {
            groupFound = true;
            break;
        }
    }

    if (groupFound == true) {
        let group = require(`../../groups/${groupName}.json`);
        group.requestedUsers.push(username);

        console.log(group);

        fs.writeFile(`../groups/${groupName}.json`, JSON.stringify(group, null, 2), (err) => {
            if (err) {
                console.log(err)
            }
        });

        res.json({
            status: 'success'
        });
    } else {
        res.json({
            status: 'failed',
            reason: 'could not find group'
        });
    }
});

module.exports = router;
