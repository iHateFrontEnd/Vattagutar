const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function declineRequest(username, toDeclineUserIndex) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        var userCollection = await client.db('users').collection(username).findOne({});

        userCollection.incomingRequests.splice(toDeclineUserIndex, 1);

        await client.db('users').collection(username).replaceOne({}, userCollection, {});
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    const username = req.body.username;
    const toDeclineUserIndex = req.body.toDeclineUserIndex;

    declineRequest(username, toDeclineUserIndex);
    res.end();
});

module.exports = router;