# V Sonde CLI

A cli form managing virtual sondes

current features:

-   start/stop a single virtual sonde that sends a POST request to localhost:3000 with a body that is a `DataRow`

possible features:

-   create new sondes
-   introduce data faults
-   load previous data

## Commands

`start` Starts all virtual sondes (currently only 1)

`stop` Stops all virtual sondes (currently only 1)

`exit` Exits CLI application
