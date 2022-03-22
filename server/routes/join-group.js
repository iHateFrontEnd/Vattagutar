const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const groupName = req.body.groupName;

    res.end();
});

module.exports = router;
