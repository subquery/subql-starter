#!/bin/bash

#wss://polkadot.api.onfinality.io/ws?apikey=fdebdc53-f4a6-4820-a0f2-3703992d99c2

while getopts p:o:e: flag
do
    case "${flag}" in
        e) ENDPOINT=${OPTARG};;
        p) PROJECTNAME=${OPTARG};;
        o) ORG=${OPTARG};;
        *) echo "Usage: $0 [-p projectname] [-o org]" && exit 1;;
    esac
done

IPFSCID=$(npx subql publish -o -f .)

npx subql deployment:deploy -d --ipfsCID="$IPFSCID" --projectName="${PROJECTNAME}" --org="${ORG%/*}" --endpoint="${ENDPOINT}"
