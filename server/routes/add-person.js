const express = require('express');
const router = express.Router();
const fs = require('fs');
var usersFile = require('../users.json');

router.post('/', (req, res) => {
  const toAddPerson = req.body.toAdd;
  const groupName = req.body.groupName;

  var userFound = false;
  var userIndex = -1;

  for (let i = 0; i <= usersFile.users.length - 1; i++) {
    userIndex++;
    if (usersFile.users[i].username === toAddPerson) {
      userFound = true;
      break;
    }
  }

  if (userFound == false) {
    res.json({
      status: 'failed',
      reason: {
        userFound: userFound
      }
    });
  }

  //writing to group file
  var group = require(`../groups/${groupName}.json`);

  group.permittedUsers.push(toAddPerson);

  fs.writeFile(`./groups/${groupName}.json`, JSON.stringify(group), (err) => {
    if (err) {
      console.log(err);
    }
  });

  //updating users.json
  usersFile.users[userIndex].groups.push(groupName);

  fs.writeFile('./users.json', JSON.stringify(usersFile), (err) => {
    if (err) {
      console.log(err)
    }
  });

  res.json({
    status: 'success'
  });

  res.end();
});

module.exports = router;