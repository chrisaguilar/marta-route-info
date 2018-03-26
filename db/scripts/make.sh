#!/usr/bin/env bash

set -e

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${dir}

curl -Os "http://www.itsmarta.com/google_transit_feed/google_transit.zip"

unzip -qq -d ../gtfs google_transit.zip

rm google_transit.zip

mkdir -p ../json

node make-routes.js
node make-shapes.js
node make-trips.js
node make-data.js

cd ../

mv ./json/data.json ./

rm -rf ./gtfs ./json
