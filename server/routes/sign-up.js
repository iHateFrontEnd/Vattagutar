const express = require('express');
const router = express.Router();
<<<<<<< HEAD
var configFile = require('../config.json');
var usersFile = require('../users.json');
=======
<<<<<<< HEAD
const configFile = require('../config.json');
const usersFile = require('../users.json');
=======
var configFile = require('../config.json');
var usersFile = require('../users.json');
>>>>>>> 1f0486b (Add friend is fixed)
>>>>>>> 3d539de087c5b4347d2ec18afa2aebdf9b3da023
const fs = require('fs');

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

<<<<<<< HEAD
    var userLayout = configFile.userLayout;

    userLayout.username = username;
    userLayout.password = password;
=======
<<<<<<< HEAD
=======
    console.log(username, password);

    configFile.userLayout.username = username;
    configFile.userLayout.password = password;

>>>>>>> 1f0486b (Add friend is fixed)
    const userLayout = configFile.userLayout;
>>>>>>> 3d539de087c5b4347d2ec18afa2aebdf9b3da023

    usersFile.users.push(userLayout);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
    });

<<<<<<< HEAD
    res.end();
});

=======
    console.log(usersFile);

    res.end();
});

/*

*/

>>>>>>> 1f0486b (Add friend is fixed)
module.exports = router;
