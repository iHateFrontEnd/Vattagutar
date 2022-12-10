const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function loadChat(res, fUsername, username) {

    console.log(fUsername, username);
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const userCollection = await client.db('users').collection(username).findOne({});

        var collectionName = '';

        //finding chat file name
        for (let i = 0; i <= userCollection.friends.length - 1; i++) {
            if (userCollection.friends[i].username == fUsername) {
                collectionName = userCollection.friends[i].collectionName;
                break;
            }
        }

        const chat = await client.db('personal').collection(collectionName).findOne({});

        res.send(chat);

    } catch (err) {
        console.log(err);
    }
}

async function loadGroupChat(groupName, res) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const group = await client.db('groups').collection(groupName).findOne({});

        if (group == null) {
            res.json({
                permittedUsers: [],
                requestedUsers: [],
                chat: "",
                groupName: groupName
            });

        } else {
            res.json({
                permittedUsers: group.permittedUsers,
                requestedUsers: group.requestedUsers,
                chat: group.chat,
                groupName: groupName
            });
        }

    } catch (err) {
        console.log(err);
    }
}

async function chatData(username, res) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const user = await client.db('users').collection(username).findOne({});

        res.json({
            groups: user.groups,
            friends: user.friends
        });
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    if (req.body.toLoad == 'group') {
        const groupName = req.body.groupName;
        loadGroupChat(groupName, res);
    } else if (req.body.toLoad == 'dm') {
        const username = req.body.username;
        const fUsername = req.body.fUsername;

        loadChat(res, fUsername, username);
    } else if (req.body.toLoad == 'chat-data') {
        const username = req.body.username;

        chatData(username, res);
    }
});

module.exports = router;