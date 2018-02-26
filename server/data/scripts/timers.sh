#!/usr/bin/env bash

set -e

getFullPath() {
    echo "$(cd "$(dirname "${1}")"; pwd)/$(basename "${1}")"
}

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ENV="$(getFullPath "${dir}/../../../../../.env")"

export $(egrep -v '^#' "${ENV}" | xargs)

scripts="
${dir}/fetch-bus.js
${dir}/fetch-rail.js
"

for script in ${scripts}; do
    node "${script}"
done

while sleep 60; do
    for script in ${scripts}; do
        node "${script}"
    done
done
