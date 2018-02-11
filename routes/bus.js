const axios = require('axios');
const express = require('express');

const router = express.Router();

router.get('/realtime', (req, res) => {
    const data = require('../data/bus.json');
    res.json(data);
});

router.get('/routes', (req, res) => {
    const data = require('../data/data.json');
    const response = {};

    for (const [route, obj] of Object.entries(data)) {
        if (!['GOLD', 'RED', 'GREEN', 'BLUE'].includes(route)) {
            response[route] = obj.route_long_name;
        }
    }

    res.json(response);
});


module.exports = router;
