const { MongoClient } = require('mongodb');
require('dotenv').config();

async function sendGroupsMsg(username, typedMsg, groupName, io) {
    const uri = process.env.DB_URL;

    const client = new MongoClient(uri);

    try {
        const groupCollection = await client.db('groups').collection(groupName).findOne({});

        groupCollection.chat.push({ [username]: typedMsg });

        io.emit('recive-msg-groups', groupCollection.chat);

        await client.db('groups').collection(groupName).replaceOne({}, groupCollection, {});
    } catch (err) {
        console.log(err);

    }
}

module.exports = sendGroupsMsg;
