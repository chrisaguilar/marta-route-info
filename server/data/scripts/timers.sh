#!/usr/bin/env bash

set -e

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

scripts="
${dir}/fetch-bus.js
${dir}/fetch-rail.js
"

for script in ${scripts}; do
    node "${script}"
done

sleep 60
