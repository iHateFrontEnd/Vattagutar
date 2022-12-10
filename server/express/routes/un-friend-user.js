const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function unFriendUser(username, fUsername, res) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        var collectionName;

        var userCollection = await client.db('users').collection(username).findOne({});

        for (let i = 0; i <= userCollection.friends.length; i++) {
            if (userCollection.friends[i].username == fUsername) {
                userCollection.friends.splice(i, 1);
                break
            }
        }

        await client.db('users').collection(username).replaceOne({}, userCollection, {});

        var fUserCollection = await client.db('users').collection(fUsername).findOne({});

        for (let i = 0; i <= fUserCollection.friends.length - 1; i++) {
            if (fUserCollection.friends[i].username == username) {
                collectionName = fUserCollection.friends[i].collectionName;
                fUserCollection.friends.splice(i, 1);
                break;
            }
        }

        await client.db('users').collection(fUsername).replaceOne({}, fUserCollection, {});

        await client.db('personal').collection(collectionName).drop();
    } catch (err) {
        console.log(err);
    }
}


router.post('/', (req, res) => {
    const username = req.body.username;
    const fUsername = req.body.fUsername;

    unFriendUser(username, fUsername, res);
});

module.exports = router;
