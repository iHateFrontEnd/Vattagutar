const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function clearChat(collectionName) {
    const uri = 'mongodb+srv://rushabh:suketujan22@cluster.tmklqqd.mongodb.net/?retryWrites=true&w=majority'

    const client = new MongoClient(uri);

    console.log(collectionName);
    try {
        await client.connect();

        const chatCollection = await client.db('groups').collection(collectionName).findOne({});
        chatCollection.chat = [];

        await client.db('groups').collection(collectionName).replaceOne({}, chatCollection, {});
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    const collectionName = req.body.collectionName;
    console.log(req.body);

    clearChat(collectionName);
});

module.exports = router;