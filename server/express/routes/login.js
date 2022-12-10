const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function loginUser(username, password, res) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const user = await client.db('users').collection(username).findOne({});

        if (user.password == password) {
            res.json({
                status: 'success',
                friends: user.friends,
                groups: user.groups
            });
        } else {
            res.json({
                status: 'failed',
                reason: 'incorrect password'
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            status: 'failed',
            reason: 'user not found'
        });
    }
}

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    loginUser(username, password, res);
});

module.exports = router;
