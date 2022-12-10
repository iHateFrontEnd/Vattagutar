const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();
async function saveNonStaticFiles(res) {
  const uri = process.env.DB_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const usersFile = {
      users: []
    }

    await client.db('user-data').collection('user').replaceOne({}, usersFile, {});

    const result = await client.db('user-data').collection('user').findOne({});

    res.send(result);
  } catch (err) {
    console.log(err);
  }
}

app.get('/reset-users', (req, res) => {
  saveNonStaticFiles(res);
});

app.get('/', (req, res) => {
  res.json('Hello world');
});

app.listen(6000);
