// So they can be distinguished from one another.
const colors = {
    "55": "blue",
    "192": "green",
    "193": "red",
    "195": "purple"
};

async function drawBusMarkers(map) {
    try {
        // Load the bus locations from the API.
        const { data } = await axios('/marta/api/bus/locations');

        // Create a marker for each bus on the map.
        Object.entries(data).forEach(([route, buses]) => {
            buses.forEach(({ DIRECTION: d, LATITUDE: lat, LONGITUDE: lng }) => {
                new google.maps.Marker({
                    icon: {
                        // Get a 'north' or 'south' image based on the bus' direction.
                        url: `/marta/images/${route}/${d.toLowerCase()}.svg`,
                        // Scale the image to 25x25
                        scaledSize: new google.maps.Size(25, 25)
                    },
                    // Give Google Maps the position of the bus
                    position: { lat: Number(lat), lng: Number(lng) },
                    // Give Google Maps the map we want to put the markers on
                    map: map
                });
            });
        });
    } catch (e) {
        // There's an error; log it to the console.
        console.error(e);
    }
}

async function drawBusRoutes(map) {
    try {
        // Get the bus routes from the API.
        const { data } = await axios('/marta/api/bus/routes');

        // Draw lines for each path
        Object.entries(data).forEach(([route, paths]) => {
             paths.forEach(path => {
                 (new google.maps.Polyline({
                     path: path,
                     geodesic: true,
                     strokeColor: colors[route],
                     strokeOpacity: 0.5,
                     strokeWeight: 2
                 })).setMap(map);
             });
        });
    } catch (e) {
        // There's an error; log it to the console.
        console.error(e);
    }
}

function initMap() {
    // My Coordinates.
    const home = { lat: 33.6, lng: -84.366 };

    // Initialize the map.
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: home
    });

    // Place a marker at home.
    const homeMarker = new google.maps.Marker({
        position: home,
        map: map
    });

    // Plot bus markers onto the map
    drawBusMarkers(map);

    // Draw bus routes onto the map
    drawBusRoutes(map);
}

(async function loadRail() {
    function extractInfo(data, station) {
        // For all of the data in `data`
        return data
            // Get only the stations that match parameter `station`
            .filter(({ STATION }) => STATION === station)
            // Get the relevant information and return it as an array
            .map(({ DIRECTION: direction, NEXT_ARR: nextArr, STATION: station, WAITING_TIME: waitingTime }) => [
                // Title-case the station name
                station.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
                // Give a better direction name
                direction === 'N' ? 'North' : 'South',
                waitingTime,
                nextArr
            ]);
    }

    function makeTableHeaders() {
        // Define the table headers.
        const headers = ['Station', 'Direction', 'Waiting Time', 'Next Arrival'];

        // Get the <thead /> element in our HTML because that's where table headers go.
        const thead = document.querySelector('thead');
        // The headers will exist in one <tr /> element.
        const tr = document.createElement('tr');

        // For every header in `headers`
        for (const header of headers) {
            // Create a new <th /> element
            const th = document.createElement('th');
            // Set it's text to `header`
            th.textContent = header;
            // Do some Bootstrap stuff
            th.setAttribute('scope', 'col');
            th.className = 'text-center';
            // Append <th /> to <tr />
            tr.appendChild(th);
        }

        // Append our headers to the <thead /> element.
        thead.appendChild(tr);

        // I could just do this in the HTML but then the headers would be there
        // with no information. I don't like the sound of that, so why not
        // dynamically load them in once I get the response from the API?
    }

    function makeTableRows(stations) {
        // Get the <tbody /> element because that's where our data goes.
        const tbody = document.querySelector('tbody');

        // For every `station` sub-array in the `stations` array
        for (const station of stations) {
            // Create a new <tr /> because we have one row / station
            const tr = document.createElement('tr');

            // For every element of the `station` sub-array
            for (const field of station) {
                // Create a new <td /> element
                const td = document.createElement('td');
                // Set its text to the current field
                td.textContent = field;
                // Do some Bootstrap stuff
                td.className = 'text-center';
                // Append it to <tr />
                tr.appendChild(td);
            }

            // Append the new station row to <tbody />
            tbody.appendChild(tr);
        }
    }

    try {
        // Load the data from the API.
        const { data } = await axios('/marta/api/rail');

        // Get the relevant information for North Ave. Station and East Point Station.
        const northAvenue = extractInfo(data, 'NORTH AVE STATION');
        const eastPoint = extractInfo(data, 'EAST POINT STATION');

        // Put our table headers in the DOM.
        makeTableHeaders();

        // Put the table rows in the DOM.
        makeTableRows([...northAvenue, ...eastPoint]);
    } catch (e) {
        // There was an error; log it to the console.
        console.error(e);
    }
})();
