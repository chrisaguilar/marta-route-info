// region VARIABLES
const directions = {
    eastbound:
        'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0 c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267 c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407 s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062 C438.533,179.485,428.732,142.795,409.133,109.203z M334.332,232.111L204.71,361.736c-3.617,3.613-7.896,5.428-12.847,5.428 c-4.952,0-9.235-1.814-12.85-5.428l-29.121-29.13c-3.617-3.613-5.426-7.898-5.426-12.847c0-4.941,1.809-9.232,5.426-12.847 l87.653-87.646l-87.657-87.65c-3.617-3.612-5.426-7.898-5.426-12.845c0-4.949,1.809-9.231,5.426-12.847l29.121-29.13 c3.619-3.615,7.898-5.424,12.85-5.424c4.95,0,9.233,1.809,12.85,5.424l129.622,129.621c3.613,3.614,5.42,7.898,5.42,12.847 C339.752,224.213,337.945,228.498,334.332,232.111z',
    northbound:
        'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0 c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267 c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407 s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062 C438.533,179.485,428.732,142.795,409.133,109.203z M361.74,259.517l-29.123,29.129c-3.621,3.614-7.901,5.424-12.847,5.424 c-4.948,0-9.236-1.81-12.847-5.424l-87.654-87.653l-87.646,87.653c-3.616,3.614-7.898,5.424-12.847,5.424 c-4.95,0-9.233-1.81-12.85-5.424l-29.12-29.129c-3.617-3.607-5.426-7.898-5.426-12.847c0-4.942,1.809-9.227,5.426-12.848 l129.62-129.616c3.617-3.617,7.898-5.424,12.847-5.424s9.238,1.807,12.846,5.424L361.74,233.822 c3.613,3.621,5.424,7.905,5.424,12.848C367.164,251.618,365.357,255.909,361.74,259.517z',
    southbound:
        'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0 c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267 c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407 s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062 C438.533,179.485,428.732,142.795,409.133,109.203z M361.733,204.705L232.119,334.324c-3.614,3.614-7.9,5.428-12.849,5.428 c-4.948,0-9.229-1.813-12.847-5.428L76.804,204.705c-3.617-3.615-5.426-7.898-5.426-12.845c0-4.949,1.809-9.235,5.426-12.851 l29.119-29.121c3.621-3.618,7.9-5.426,12.851-5.426c4.948,0,9.231,1.809,12.847,5.426l87.65,87.65l87.65-87.65 c3.614-3.618,7.898-5.426,12.847-5.426c4.949,0,9.233,1.809,12.847,5.426l29.123,29.121c3.621,3.616,5.428,7.902,5.428,12.851 C367.164,196.807,365.357,201.09,361.733,204.705z',
    westbound:
        'M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0 c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267 c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407 s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062 C438.533,179.485,428.732,142.795,409.133,109.203z M288.646,306.913c3.621,3.614,5.435,7.901,5.435,12.847 c0,4.948-1.813,9.236-5.435,12.847l-29.126,29.13c-3.61,3.617-7.891,5.428-12.84,5.421c-4.951,0-9.232-1.811-12.854-5.421 L104.21,232.111c-3.617-3.62-5.424-7.898-5.424-12.848c0-4.949,1.807-9.233,5.424-12.847L233.826,76.795 c3.621-3.615,7.902-5.424,12.854-5.424c4.949,0,9.229,1.809,12.84,5.424l29.126,29.13c3.621,3.615,5.435,7.898,5.435,12.847 c0,4.946-1.813,9.233-5.435,12.845l-87.646,87.65L288.646,306.913z'
};
// endregion VARIABLES

// region GLOBALS
let map;

function titleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
// endregion GLOBALS

// region BUS
const bus = {
    markers: [],
    polylines: [],
    used: [],
    unused: [],
    add: function(route) {
        this.used.push(route);
        this.unused = this.unused.filter(e => e !== route);
        localStorage.setItem('buses used', JSON.stringify(this.used));
        this.update();
    },
    makeLabels: function() {
        const labelEl = $('#bus-labels');
        labelEl.empty();
        const routes = _.chunk(this.used, 4);

        routes.forEach(row => {
            const rowEl = $(`<div class="row justify-content-center"></div>`);
            row.forEach(label => {
                const labelData = JSON.parse(localStorage.getItem(label) || '{}');
                const routeEl = $(`
                    <div class="col-3" data-route="${label}" style="color:${labelData.color}">
                        <span class="bus-label"> Route ${label}<span class="remove-bus-label">&times;</span></span>
                    </div>
                `);
                rowEl.append(routeEl);
            });
            labelEl.append(rowEl);
        });
    },
    makeMarkers: async function() {
        try {
            this.markers.forEach(marker => marker.setMap(null));
            this.markers = [];

            const data = (await axios('/marta/api/bus/realtime')).data.filter(e => this.used.includes(e.ROUTE));

            for (const bus of data) {
                const { DIRECTION: dir, LATITUDE: lat, LONGITUDE: lon, ROUTE: route } = bus;
                const metadata = JSON.parse(localStorage.getItem(route));
                this.markers.push(
                    new google.maps.Marker({
                        map: map,
                        icon: {
                            path: directions[dir.toLowerCase()],
                            fillColor: metadata.color,
                            fillOpacity: 1.0,
                            scale: 0.05
                        },
                        position: {
                            lat: +lat,
                            lng: +lon
                        }
                    })
                );
            }
        } catch (e) {
            console.error(e);
            console.error('There was an error rendering the map markers.');
        }
    },
    makePolylines: async function() {
        this.polylines.forEach(polyline => polyline.setMap(null));
        this.polylines = [];

        for (const route of JSON.parse(localStorage.getItem('buses used') || '[]')) {
            const { color, shapes } = JSON.parse(localStorage.getItem(route));

            for (const shape of shapes) {
                this.polylines.push(
                    new google.maps.Polyline({
                        map: map,
                        anchor: new google.maps.Point(0, 0),
                        geodesic: true,
                        path: shape,
                        strokeColor: color,
                        strokeOpacity: 0.5,
                        strokeWeight: 2
                    })
                );
            }
        }
    },
    makeOpts: async function() {
        try {
            const busOptionsEl = $('#bus-options');
            busOptionsEl.empty();
            busOptionsEl.append($(`<option selected="selected" disabled="disabled">Select Route to Add...</option>`));

            if (!localStorage.getItem('bus routes')) {
                const { data } = await axios('/marta/api/bus/routes');
                localStorage.setItem('bus routes', JSON.stringify(data));
            }

            const busRoutes = JSON.parse(localStorage.getItem('bus routes'));

            for (const [route_short_name, route_long_name] of Object.entries(busRoutes)) {
                if (!this.used.includes(route_short_name)) {
                    busOptionsEl.append(
                        `<option value="${route_short_name}">${route_short_name} - ${route_long_name}</option>`
                    );
                }
            }
        } catch (e) {
            console.error(e);
            console.error('There was a problem fetching the route names.');
        }
    },
    remove: function(route) {
        this.unused.push(route);
        this.used = this.used.filter(e => e !== route);
        localStorage.setItem('buses used', JSON.stringify(this.used));
        this.update();
    },
    update: function() {
        this.makeLabels();
        this.makeMarkers();
        this.makeOpts();
        this.makePolylines();
    }
};

// endregion BUS

// region RAIL
const rail = {
    used: [],
    unused: [],
    add: function(station) {
        this.used.push(station);
        this.unused = this.unused.filter(e => e !== station);
        localStorage.setItem('stations used', JSON.stringify(this.used));
        this.update();
    },
    makeOpts: async function() {
        try {
            const railOptionsEl = $('#rail-options');
            railOptionsEl.empty();
            railOptionsEl.append(
                $(`<option selected="selected" disabled="disabled">Select Station to Add...</option>`)
            );

            if (!localStorage.getItem('train stations')) {
                const { data } = await axios('/marta/api/rail/realtime');
                const stations = [...new Set(data.map(e => titleCase(e.STATION)).sort()).values()];
                localStorage.setItem('train stations', JSON.stringify(stations));
            }

            const trainStations = JSON.parse(localStorage.getItem('train stations'));

            for (const station of trainStations) {
                if (!this.used.includes(station)) {
                    railOptionsEl.append(`<option value="${station}">${station.replace(/ Station/g, '')}</option>`);
                }
            }
        } catch (e) {
            console.error(e);
            console.error('There was a problem fetching the station names.');
        }
    },
    makeTables: async function() {
        try {
            const railTablesEl = $('#rail-tables');
            railTablesEl.empty();

            const data = (await axios('/marta/api/rail/realtime')).data
                .filter(e => this.used.includes(titleCase(e.STATION)))
                .reduce((obj, next) => {
                    const station = titleCase(next.STATION);
                    if (!obj[station]) obj[station] = [];
                    obj[station].push(next);

                    return obj;
                }, {});

            for (const station of this.used) {
                const stationNoSpace = station.split(/\s*/g).join('');
                const stationTableEl = $(`
                    <div id="${stationNoSpace}" class="tab-pane fade">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col">Line</th>
                                    <th class="text-center" scope="col">Direction</th>
                                    <th class="text-center" scope="col">Waiting Time</th>
                                    <th class="text-center" scope="col">Next Arrival</th>
                                </tr>
                            </thead>
                            <tbody id="${stationNoSpace}-body"></tbody>
                        </table>
                    </div>
                `);
                railTablesEl.append(stationTableEl);

                const stationTableBody = $(`#${stationNoSpace}-body`);
                const nextArrivals = data[station];
                nextArrivals.forEach(next => {
                    const { LINE, DIRECTION, WAITING_TIME, NEXT_ARR } = next;
                    const longDirection = d => {
                        switch (d) {
                            case 'E':
                                return 'East';
                            case 'N':
                                return 'North';
                            case 'S':
                                return 'South';
                            case 'W':
                                return 'West';
                        }
                    };
                    const body = $(`
                        <tr class="text-center">
                            <td>${titleCase(LINE)}</td>
                            <td>${longDirection(DIRECTION)}</td>
                            <td>${WAITING_TIME}</td>
                            <td>${NEXT_ARR}</td>
                        </tr>
                    `);
                    stationTableBody.append(body);
                });
            }

            $('#rail-tables > :first-child').addClass('active show');
        } catch (e) {
            console.error(e);
            console.error('Error while building station tables!');
        }
    },
    makeTabs: function() {
        const railTabsEl = $('#rail-tabs');
        railTabsEl.empty();

        for (const station of this.used) {
            const sansStation = station.replace(/ Station/g, '');
            const stationNoSpace = station.split(/\s*/g).join('');
            const tab = $(`
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" data-station="${station}" href="#${stationNoSpace}">
                        ${sansStation} <span class="remove-rail text-danger">&times;</span>
                    </a>
                </li>
            `);
            railTabsEl.append(tab);
        }

        $('#rail-tabs > li:first-child > a').addClass('active');
    },
    remove: function(station) {
        this.unused.push(station);
        this.used = this.used.filter(e => e !== station);
        localStorage.setItem('stations used', JSON.stringify(this.used));
        this.update();
    },
    update: function() {
        this.makeOpts();
        this.makeTables();
        this.makeTabs();
    }
};
// endregion RAIL

// region EVENT HANDLERS
$('#bus-add-route').on('click', async function() {
    try {
        const route = $('#bus-options').val();

        if (!route) return;

        const { data } = await axios(`/marta/api/bus/${route}`);

        localStorage.setItem(`${route}`, JSON.stringify(data));
        bus.add(`${route}`);
    } catch (e) {
        console.error(e);
        alert('There was a problem adding that bus route.');
    }
});

$(document.body).on('click', '.bus-label', function() {
    const route = $(this)
        .parent()
        .data('route');
    localStorage.removeItem(`${route}`);
    bus.remove(`${route}`);
});

$('#rail-add-station').on('click', async function() {
    try {
        const station = $('#rail-options').val();

        if (!station) return;

        rail.add(station);
    } catch (e) {
        console.error(e);
        alert('There was a problem adding that station.');
    }
});

$(document.body).on('click', '.remove-rail', function() {
    const station = $(this)
        .parent()
        .data('station');
    rail.remove(station);
});

navigator.geolocation.getCurrentPosition(position => {
    const { latitude: lat, longitude: lng } = position.coords;
    map = new google.maps.Map(document.getElementById('bus-map'), { zoom: 13, center: { lat, lng } });
    const currentPositionMarker = new google.maps.Marker({ map: map, position: { lat, lng } });

    google.maps.event.addListenerOnce(map, 'idle', function() {
        bus.used = JSON.parse(localStorage.getItem('buses used') || '[]');
        bus.update();

        rail.used = JSON.parse(localStorage.getItem('stations used') || '[]');
        rail.update();
    });
});
// endregion EVENT HANDLERS
