const fs = require('fs');
const { promisify } = require('util');

const axios = require('axios');
const express = require('express');

const readFile = promisify(fs.readFile);

const router = express.Router();

router.get('/realtime', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('../data/rail.json', 'utf8'));
        res.json(data);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
