#!/usr/bin/env bash

echo ""
echo "*****STARTING UP DB TO PROVISION*****"

gosu postgres pg_ctl start -w -D $PGDATA

echo ""
echo "******EXECUTING WEB_USERS SCRIPT******"

gosu postgres psql -h localhost \
                   -p $POSTGRES_PORT \
                   -U postgres  \
                   -d $POSTGRES_DB \
                   -a \
                   -f /docker-entrypoint-initdb.d/schemaChangeLog.sql

echo ""
echo "******WEB_USERS SCRIPT DONE******"

echo ""
echo "*****PROVICION COMPLETE SHUTING DOWN DB CLUSTER*****"

gosu postgres pg_ctl stop -w

echo ""
echo "******DB CLUSTER SHUT DOWN******"
