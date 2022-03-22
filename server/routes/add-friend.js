const express = require('express');
const router = express.Router();
const usersFile = require('../users.json');
const fs = require('fs');

router.post('/', (req, res) => {
    //f refers to friend        
<<<<<<< HEAD
=======
<<<<<<< HEAD

>>>>>>> 3d539de087c5b4347d2ec18afa2aebdf9b3da023
    const userIndex = parseInt(req.body.userIndex);
    const username = req.body.username;
    const fUsername = req.body.fUsername;

    var fUserFound = false;
    var fUserIndex = -1;

    //checking if friend exists
    for (let i = 0; i <= usersFile.users.length - 1; i++) {
<<<<<<< HEAD
        fUserIndex++;

=======
=======
    const userIndex = parseInt(req.body.userIndex);
    const fUsername = req.body.fUsername;
    
    const username = usersFile.users[userIndex].username;
    
    var fUserFound = false;
    var fUserIndex = -1;

    //checking if friend exists
    for (let i = 0; i <= usersFile.users.length - 1; i++) {
        fUserIndex++;

>>>>>>> 1f0486b (Add friend is fixed)
>>>>>>> 3d539de087c5b4347d2ec18afa2aebdf9b3da023
        if (usersFile.users[i].username == fUsername) {
            fUserFound = true;
            break;
        }
    }

    if (fUserFound == true) {
<<<<<<< HEAD
        res.json({
            status: 'success',
        });

        //writing to incoming requests
        usersFile.users[userIndex].sentRequest.push(fUsername);

        //wrirting to sentRequests
        usersFile.users[fUserIndex].incomingRequests.push(username);

        fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
            if (err) {
                console.log(err);
            }
        });
=======
<<<<<<< HEAD
        //pass
=======
        res.json({
            status: 'success',
            serverStatus: 200
        });
>>>>>>> 1f0486b (Add friend is fixed)
>>>>>>> 3d539de087c5b4347d2ec18afa2aebdf9b3da023
    } else {
        res.json({
            status: 'failed',
            reason: 'friend not found'
        });
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
    //writing to incoming requests
    usersFile.users[userIndex].incomingRequests.push(fUsername);

    fs.writeFile('../users.json', JSON.stringify(usersFile, null, 2), (err) => {
=======
    console.log(fUserIndex);

    //writing to incoming requests
    usersFile.users[userIndex].sentRequest.push(fUsername);

    //writing to sent requests
    usersFile.users[fUserIndex].incomingRequests.push(username);

    fs.writeFile('./users.json', JSON.stringify(usersFile, null, 2), (err) => {
>>>>>>> 1f0486b (Add friend is fixed)
        if (err) {
            console.log(err);
        }
    });

>>>>>>> 3d539de087c5b4347d2ec18afa2aebdf9b3da023
    res.end();
});

module.exports = router;