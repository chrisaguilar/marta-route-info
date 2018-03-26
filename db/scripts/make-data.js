const fs = require('fs');
const util = require('util');

const _ = require('lodash');

const routes = require('../json/routes.json');
const shapes = require('../json/shapes.json');
const trips = require('../json/trips.json');

const writeFile = util.promisify(fs.writeFile);

const colors = [
    '#008a00', '#60a917', '#00aba9', '#1ba1e2', '#0050ef', '#6a00ff', '#aa00ff',
    '#d80073', '#a20025', '#e51400', '#825a2c', '#6d8764', '#647687', '#76608a',
    '#a0522d', '#3b5999', '#0084ff', '#0077B5', '#007ee5', '#21759b', '#0077b5',
    '#4c75a3', '#34465d', '#410093', '#1ab7ea', '#bd081c', '#b92b27', '#af0606',
    '#3aaf85', '#00b489', '#00c300', '#02b875', '#09b83e', '#25D366', '#131418',
    '#c62828', '#b71c1c', '#AD1457', '#880E4F', '#6A1B9A', '#4A148C', '#4527A0',
    '#311B92', '#283593', '#1A237E', '#1565C0', '#0D47A1', '#0277BD', '#01579B',
    '#00838F', '#006064', '#00695C', '#004D40', '#2E7D32', '#1B5E20', '#558B2F',
    '#33691E', '#4E342E', '#3E2723', '#424242', '#212121', '#37474F', '#263238',
    '#3498db', '#34495e', '#2c3e50', '#2980b9', '#16a085', '#1abc9c', '#27ae60'
];

const randomcolor = () => colors[Math.floor(Math.random() * colors.length)];

(async () => {
    try {
        const final = {};
        const mergedData = _.merge(routes, trips);

        for (const [route_id, data] of Object.entries(mergedData)) {
            mergedData[route_id].shapes = [];
            mergedData[route_id].color = randomcolor();
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
