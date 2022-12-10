const { MongoClient } = require('mongodb');
require('dotenv').config();

async function sendDmMsg(msg, username, fUsername, io) {
    const uri = process.env.DB_URL;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        var collectionName;

        const userCollection = await client.db('users').collection(username).findOne({});

        //finding chat collection name
        for (let i = 0; i <= userCollection.friends.length; i++) {
            if (userCollection.friends[i].username == fUsername) {
                collectionName = userCollection.friends[i].collectionName;
                break;
            }
        }

        const chatCollection = await client.db('personal').collection(collectionName).findOne({});

        chatCollection.chat.push({
            [username]: msg
        });

        io.emit('recive-msg-dm', chatCollection.chat);


        await client.db('personal').collection(collectionName).replaceOne({}, chatCollection, {});
    } catch (err) {
        console.log(err);
    }

}

module.exports = sendDmMsg;
