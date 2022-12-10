const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function allowUser(groupName, username) {
    const uri = 'mongodb+srv://rushabh:suketujan22@cluster.tmklqqd.mongodb.net/?retryWrites=true&w=majority'

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const groupCollection = await client.db('groups').collection(groupName).findOne({});

        for (let i = 0; i <= groupCollection.requestedUsers.length; i++) {
            if (groupCollection.requestedUsers[i] == username) {
                groupCollection.requestedUsers.splice(i, 1);
                break;
            }
        }

        groupCollection.permittedUsers.push(username);

        await client.db('groups').collection(groupName).replaceOne({}, groupCollection, {});

        const userCollection = await client.db('users').collection(username).findOne({});
        userCollection.groups.push(groupName);

        await client.db('users').collection(username).replaceOne({}, userCollection, {});
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    const groupName = req.body.groupName;
    const username = req.body.username;

    allowUser(groupName, username);

    console.log('in this route');
});

module.exports = router;
