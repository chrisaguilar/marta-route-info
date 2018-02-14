const fs = require('fs');
const { promisify } = require('util');

const axios = require('axios');
const express = require('express');

const readFile = promisify(fs.readFile);

const router = express.Router();

router.get('/realtime', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('../data/bus.json', 'utf8'));
        res.json(data);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/routes', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('../data/data.json', 'utf8'));
        const response = {};

        for (const [route, obj] of Object.entries(data)) {
            if (!['GOLD', 'RED', 'GREEN', 'BLUE'].includes(route)) {
                response[route] = obj.route_long_name;
            }
        }

        res.json(response);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:bus', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('../data/data.json', 'utf8'));
        res.json(data[req.params.bus]);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
