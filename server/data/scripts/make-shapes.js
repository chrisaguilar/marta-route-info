const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function main() {
    try {
        // Read the `trips.txt` file
        const shapes = (await readFile('../gtfs/shapes.txt', 'utf8'))

            // Trim excess whitespace
            .trim()

            // Split on newlines
            .split("\r\n")

            // Split each line on commas
            .map(line => line.split(','))

            // Skip the first line (the header row)
            .slice(1)

            // Reduce the information to a single object
            .reduce((data, [shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence]) => {
                // If data[shape_id] doesn't exist then set it to an empty array
                if (!data[shape_id]) data[shape_id] = [];

                // Push the new {lat,lng} object to the data[shape_id] array
                data[shape_id].push({lat: Number(shape_pt_lat), lng: Number(shape_pt_lon)});

                // Pass the modified data to the next run
                return data;
            }, {});

        // Write the shapes object to a file
        await writeFile('../json/shapes.json', JSON.stringify(shapes), 'utf8');
    } catch (e) {
        // There was an error. Log it.
        console.error(e);
    }
}

main();
