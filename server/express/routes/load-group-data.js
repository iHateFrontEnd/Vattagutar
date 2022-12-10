const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function loadGroupData(groupName, res) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const groupCollection = await client.db('groups').collection(groupName).findOne({});

        res.json({
            requestedUsers: groupCollection.requestedUsers,
            permittedUsers: groupCollection.permittedUsers
        });
    } catch (err) {
        console.log(err);
    }
}

router.post('/', (req, res) => {
    loadGroupData(req.body.groupName, res)

    console.log(req.body.groupName);
});

module.exports = router;
