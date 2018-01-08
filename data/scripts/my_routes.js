// Route - Route ID
// 55    - 7665
// 192   - 7727
// 193   - 7728
// 195   - 7730

const fs = require('fs');
const { promisify } = require('util');

// Get parsed trips and shapes

// trips has form {route_id: string = shape_id: string[]}
const trips = require('../json/trips.json');
// shapes has form {shape_id: string = {lat: string, lng: string}[]}
const shapes = require('../json/shapes.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


async function main() {
    // `data` is an object with keys that correspond to `route` and values that
    // correspond to an array of objects that will be used by the Google Maps
    // API to draw the route lines.
    const data = { "55": [], "192": [], "193": [], "195": [] };

    // Route:RouteID correspondence
    const routes = { "55": "7665", "192": "7727", "193": "7728", "195": "7730" };

    // for every `route` and `route_id` in `routes`
    for (const [route, route_id] of Object.entries(routes)) {
        // for every `shape_id` in the set of unique values in `trips[route_id]`
        for (const shape_id of new Set(trips[route_id])) {
            // Push the array of objects that corresponds to shapes[shape_id] to data[route]
            data[route].push(shapes[shape_id]);
        }
    }

    // Write the route shapes to a file so that it can be loaded via the API
    await writeFile('../json/my_routes.json', JSON.stringify(data), 'utf8');
}

main();
