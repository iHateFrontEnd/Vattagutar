const express = require('express');
const app = express();
const router = express.Router();

router.post('/', (req, res) => {
  res.json({
    isUpdate: true
  });

  res.end();
});

module.exports = router;
