#!/usr/bin/env bash

set -e

curl -O "http://www.itsmarta.com/google_transit_feed/google_transit.zip"

unzip -d ../gtfs google_transit.zip

rm google_transit.zip

mkdir -p ../json

node shapes.js

node trips.js

node my_routes.js

echo "Finished!"
