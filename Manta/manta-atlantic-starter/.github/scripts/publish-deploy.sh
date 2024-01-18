#!/bin/bash

while getopts p:o:e: flag
do
    case "${flag}" in
        e) ENDPOINT=${OPTARG};;
        p) PROJECTNAME=${OPTARG};;
        o) ORG=${OPTARG};;
        *) echo "Usage: $0 [-p projectname] [-o org] [-e endpoint]" && exit 1;;
    esac
done

IPFSCID=$(npx subql publish -o -f .)

npx subql deployment:deploy -d --ipfsCID="$IPFSCID" --projectName="${PROJECTNAME}" --org="${ORG%/*}" --endpoint="${ENDPOINT}"
