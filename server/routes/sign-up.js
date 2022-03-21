const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const configFile = require('../config.json');
const usersFile = require('../users.json');
=======
var configFile = require('../config.json');
var usersFile = require('../users.json');
>>>>>>> 1f0486b (Add friend is fixed)
const fs = require('fs');

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

<<<<<<< HEAD
=======
    console.log(username, password);

    configFile.userLayout.username = username;
    configFile.userLayout.password = password;

>>>>>>> 1f0486b (Add friend is fixed)
    const userLayout = configFile.userLayout;

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
