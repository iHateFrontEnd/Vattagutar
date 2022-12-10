const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function removeUser(groupName, username) {
    const uri = 'mongodb+srv://rushabh:suketujan22@cluster.tmklqqd.mongodb.net/?retryWrites=true&w=majority'

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const userCollection = await client.db('users').collection(username).findOne({});

        for (let i = 0; i <= userCollection.groups.length; i++) {
            if (userCollection.groups[i] == groupName) {
                userCollection.groups.splice(i, 1);
                break;
            }
        }

        await client.db('users').collection(username).replaceOne({}, userCollection, {});

        const groupCollection = await client.db('groups').collection(groupName).findOne({});

        for (let i = 0; i <= groupCollection.permittedUsers.length; i++) {
            if (groupCollection.permittedUsers[i] == username) {
                groupCollection.permittedUsers.splice(i, 1);
                break;
            }
        }

        await client.db('groups').collection(groupName).replaceOne({}, groupCollection, {});
    } catch (err) {
        console.log(err);
    }
}

//this function changes the users.json
function modifyUsersFile(username, groupName) {
    //searching for user
    var userIndex = -1;

    for (let i = 0; i <= usersFile.users.length; i++) {
        userIndex++;

        if (usersFile.users[i].username == username) break;
    }

    //searching for group inside "groups" obj of the user
    var groupIndex = -1;

    for (let i = 0; i <= usersFile.users[userIndex].groups.length; i++) {
        groupIndex++;

        if (usersFile.users[userIndex].groups[i] == groupName) break;
    }

    usersFile.users[userIndex].groups.splice(groupIndex, 1);

    fs.writeFile(`../users.json`, JSON.stringify(usersFile), (err) => {
        if (err) console.log(err);
    });
}

//this function changes the main chat/group file
function modifyGroupFile(groupName, username) {
    var groupFile = require(`../../groups/${groupName}.json`);

    //searching for group inside "groups" obj of the user
    var userIndex = -1;

    for (let i = 0; i <= groupFile.permittedUsers.length; i++) {
        userIndex++;

        if (groupFile.permittedUsers[i] == username) break;
    }

    groupFile.permittedUsers.splice(userIndex, 1);

    fs.writeFile(`../groups/${groupName}.json`, JSON.stringify(groupFile), (err) => {
        if (err) console.log(err);
    });
}

router.post('/', (req, res) => {
    const groupName = req.body.groupName;
    const toRemoveUser = req.body.toRemoveUser;

    removeUser(groupName, toRemoveUser);

    res.end();
});

module.exports = router;