const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function clearDmChat(collectionName) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        const chatCollection = await client.db('personal').collection(collectionName).findOne({});
        chatCollection.chat = [];

        await client.db('personal').collection(collectionName).replaceOne({}, chatCollection, {});
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    const collectionName = req.body.collectionName;

    clearDmChat(collectionName);
});

module.exports = router;