const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config(); const configFile = require('../../config.json');

async function createUser(username, password) {
    const uri = process.env.DB_URL;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        //creating a new user collection
        await client.db('users').createCollection(username);

        configFile.userLayout.username = username;
        configFile.userLayout.password = password;


        await client.db('users').collection(username).insertOne(configFile.userLayout);
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    createUser(username, password);

    res.end();
});

module.exports = router;
