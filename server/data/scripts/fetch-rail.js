const fs = require('fs');
const path = require('path');
const util = require('util');

const axios = require('axios');

const writeFile = util.promisify(fs.writeFile);

(async function getRail() {
    try {
        const { data } = await axios({
            baseURL: 'http://developer.itsmarta.com',
            url: '/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals',
            params: {
                apikey: process.env.MARTA_RAIL_API_KEY
            }
        });

        await writeFile(path.join(__dirname, '../rail.json'), JSON.stringify(data), 'utf8');
    } catch (e) {
        console.error(e);
    }
})();
