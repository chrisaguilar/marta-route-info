const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
    try {
        // Read the `routes.txt` file
        const routes = (await readFile('../gtfs/routes.txt', 'utf8'))

            // Trim excess whitespace
            .trim()

            // Split on newlines
            .split("\r\n")

            // Split each line on commas
            .map(line => line.split(','))

            // Skip the first line (the header row)
            .slice(1)

            // Reduce the information to a single object
            .reduce((data, [route_id, route_short_name, route_long_name, route_desc, route_type, route_url, route_color, route_text_color]) => {
                // if data[route_id] doesn't exist then create it with the relevant information that we need.
                if (!data[route_id]) data[route_id] = { route_id, route_short_name, route_long_name };

                // Pass the modified data to the next run
                return data;
            }, {});

        // Write the routes object to a file
        await writeFile('../json/routes.json', JSON.stringify(routes), 'utf8');
    } catch (e) {
        // There was an error. Log it.
        console.error(e);
    }
})();
