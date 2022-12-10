const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function leaveGroup(username, groupName, res) {
  const uri = 'mongodb+srv://rushabh:suketujan22@cluster.tmklqqd.mongodb.net/?retryWrites=true&w=majority'

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const userCollection = await client.db('users').collection(username).findOne({});

    for (let i = 0; i <= userCollection.groups.length; i++) {
      if (userCollection.groups[i] == groupName) {
        userCollection.groups.splice(i, 1);
        break;
      }
    }

    await client.db('users').collection(username).replaceOne({}, userCollection, {});

    const groupCollection = await client.db('groups').collection(groupName).findOne({});

    for (let i = 0; i <= groupCollection.permittedUsers.length; i++) {
      if (groupCollection.permittedUsers[i] == username) {
        groupCollection.permittedUsers.splice(i, 1);
        break;
      }
    }

    await client.db('groups').collection(groupName).replaceOne({}, groupCollection, {});

    res.json({
      groups: userCollection.groups,
      friends: groupCollection.friends
    });
  } catch (err) {
    console.log(err);
  }

}

router.post('/', (req, res) => {
  const username = req.body.username;
  const groupName = req.body.groupName;

  leaveGroup(username, groupName, res);
});
module.exports = router;
