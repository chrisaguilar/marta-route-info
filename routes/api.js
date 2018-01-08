const axios = require('axios');
const express = require('express');

const router = express.Router();

// These routes are pretty straightforward. All they do is fetch the API data
// from the MARTA developer API and relays that information to the client on
// my site. Nothing magical here.

router.get('/bus/locations', async (req, res, next) => {
    const routes = [55, 192, 193, 195];
    const response = {};

    try {
        for (const route of routes) {
            const { data } = await axios({
                baseURL: 'http://developer.itsmarta.com/',
                url: `/BRDRestService/RestBusRealTimeService/GetBusByRoute/${route}`
            });
            response[route] = data;
        }

        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/bus/routes', (req, res) => {
    const routes = require('../data/json/my_routes.json');
    res.json(routes);
});

router.get('/rail', async (req, res, next) => {
    try {
        const { data } = await axios({
            baseURL: 'http://developer.itsmarta.com',
            url: '/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals',
            params: {
                apikey: process.env.MARTA_RAIL_API_KEY
            }
        });

        res.json(data);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
