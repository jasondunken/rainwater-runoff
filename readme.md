# Mono repo for the Roof Rainwater Runoff sonde monitoring system

The Roof Rainwater Runoff monitoring system is comprised of three primary components, sondes in field that are running a customized Arduino script, a server that receives sonde data and validetes it as it is produced, and a web client for data monitoring and exploration.

## Rainwater-Dashboard is an Angular v19 client for the system

-   [Rainwater dashboard readme](rainwater-dashboard/readme.md)

## Rainwater-Server is a Nest.js server

-   [Rainwater server readme](rainwater-server/readme.md)
-   Swagger/openapi page @/api
-   Sqlite db

## Virtual-Sonde is a virtual sonde for testing, controlled via a cli

-   [virtual-sonde readme](v-sonde/readme.md)
