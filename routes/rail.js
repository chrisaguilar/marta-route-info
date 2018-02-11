const axios = require('axios');
const express = require('express');

const router = express.Router();

router.get('/realtime', (req, res) => {
    const data = require('../data/rail.json');
    res.json(data);
});

module.exports = router;
