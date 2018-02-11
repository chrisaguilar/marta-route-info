const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function main() {
    try {
        // Read the `trips.txt` file
        const trips = (await readFile('../gtfs/trips.txt', 'utf8'))

            // Trim excess whitespace
            .trim()

            // Split on newlines
            .split("\r\n")

            // Split each line on commas
            .map(line => line.split(','))

            // Skip the first line (the header row)
            .slice(1)

            // Reduce the information to a single object
            .reduce((data, [route_id, service_id, trip_id, trip_headsign, direction_id, block_id, shape_id]) => {
                // if data[route_id] doesn't exist then set it to an empty array
                if (!data[route_id]) data[route_id] = { trips: [] };

                // Push the shape_id string to data[route_id]
                data[route_id].trips.push(shape_id);

                // Pass the modified data to the next run
                return data;
            }, {});

        // Write the trips object to a file
        await writeFile('../json/trips.json', JSON.stringify(trips), 'utf8');
    } catch (e) {
        // There was an error. Log it.
        console.error(e);
    }
}

main();
