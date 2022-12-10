const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function loadFriendReqs(res, username) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const userCollection = await client.db('users').collection(username).findOne({});

        res.json({
            requests: userCollection.incomingRequests
        });
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    const username = req.body.username

    loadFriendReqs(res, username);
});

module.exports = router;