const configFile = require('../../config.json');
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function acceptRequest(toAcceptUser, username, socket) {
    const uri = process.env.DB_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        //user collection for toAcceptUser
        var fUserCollection = await client.db('users').collection(toAcceptUser).findOne({});


        for (let i = 0; i <= fUserCollection.sentRequests.length; i++) {
            if (fUserCollection.sentRequests[i] == username) {
                fUserCollection.sentRequests.splice(i, 1);
                break;
            }
        }

        fUserCollection.friends.push(
            {
                username: username,
                collectionName: `${username}_${toAcceptUser}`
            }
        );

        await client.db('users').collection(toAcceptUser).replaceOne({}, fUserCollection, {});

        //editing user collection of the user to accepted the requests
        var userCollection = await client.db('users').collection(username).findOne({})

        for (let i = 0; i <= userCollection.incomingRequests.length; i++) {
            if (userCollection.incomingRequests[i] == toAcceptUser) {
                userCollection.incomingRequests.splice(i, 1);
                break;
            }
        }

        userCollection.friends.push({
            username: toAcceptUser,
            collectionName: `${username}_${toAcceptUser}`
        });

        await client.db('users').collection(username).replaceOne({}, userCollection, {});

        //creating chat file
        await client.db('personal').createCollection(`${username}_${toAcceptUser}`);

        //creating the chat file 
        configFile.dmChatLayout.permittedUsers.push(toAcceptUser, username);

        await client.db('personal').collection(`${username}_${toAcceptUser}`).insertOne(configFile.dmChatLayout);

        socket.broadcast.emit('added-friend', username, toAcceptUser);
    } catch (err) {
        console.log(err);
    }
}

module.exports = acceptRequest;