const fs = require('fs');
const path = require('path');
const util = require('util');

const axios = require('axios');

const writeFile = util.promisify(fs.writeFile);

module.exports = function () {
    async function getBus() {
        try {
            const { data } = await axios({
                baseURL: 'http://developer.itsmarta.com/',
                url: '/BRDRestService/RestBusRealTimeService/GetAllBus'
            });

            await writeFile(path.join(__dirname, '../bus.json'), JSON.stringify(data), 'utf8');
        } catch (e) {
            console.error(e);
        }
    }

    getBus();

    setInterval(getBus, 1000 * 60);
}
