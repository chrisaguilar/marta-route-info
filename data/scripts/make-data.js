const fs = require('fs');
const util = require('util');

const randomcolor = require('random-material-color');
const _ = require('lodash');

const routes = require('../json/routes.json');
const shapes = require('../json/shapes.json');
const trips = require('../json/trips.json');

const writeFile = util.promisify(fs.writeFile);

(async () => {
    try {
        const final = {};
        const mergedData = _.merge(routes, trips);

        for (const [route_id, data] of Object.entries(mergedData)) {
            mergedData[route_id].shapes = [];
            mergedData[route_id].color = randomcolor.getColor({ shades: ['800', '900'] });
            mergedData[route_id].trips = [...new Set(data.trips).values()];

            for (const trip of mergedData[route_id].trips) {
                mergedData[route_id].shapes.push(shapes[trip]);
            }

            final[data.route_short_name] = mergedData[route_id];
        }

        await writeFile('../json/data.json', JSON.stringify(final), 'utf8');
    } catch (e) {
        console.error(e);
    }
})();
