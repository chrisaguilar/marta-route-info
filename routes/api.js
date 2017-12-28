const axios = require('axios');
const express = require('express');

const router = express.Router();

// These routes are pretty straightforward. All they do is fetch the API data
// from the MARTA developer API and relays that information to the client on
// my site. Nothing magical here.

router.get('/bus', async (req, res, next) => {
    try {
        const { data } = await axios({
            baseURL: 'http://developer.itsmarta.com/',
            url: '/BRDRestService/RestBusRealTimeService/GetBusByRoute/193'
        });

        res.json(data);
    } catch (e) {
        next(e);
    }
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
