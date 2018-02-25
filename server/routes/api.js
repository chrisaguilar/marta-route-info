const express = require('express');

const router = express.Router();

router.use('/bus', require('./bus'));
router.use('/rail', require('./rail'));

module.exports = router;
