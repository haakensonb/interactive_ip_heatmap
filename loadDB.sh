#!/bin/sh
# Get docker container id using "docker ps".
# Pass container id as first command line arg.
# Probably a better way to do this...
docker exec -i $1 pg_restore -U postgres -d postgres < mygis.sql