const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function addPerson(username, groupName, res) {
  const uri = process.env.DB_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const user = await client.db('users').collection(username).findOne({});

    if (user != null) {
      //adding user to the group
      const group = await client.db('groups').collection(groupName).findOne({})
      group.permittedUsers.push(username);

      await client.db('groups').collection(groupName).replaceOne({}, group, {});

      user.groups.push(groupName);

      await client.db('users').collection(username).replaceOne({}, user, {});

      res.json({
        status: 'success'
      });
    } else {
      res.json({
        status: 'failed',
        reason: 'user not found'
      });
    }
  } catch (err) {
    console.log(err);
  }

}

router.post('/', (req, res) => {
  const groupName = req.body.groupName;
  const username = req.body.username;

  addPerson(username, groupName, res);
});

module.exports = router;
