import * as readline from "readline";

import VSonde from "./v-sonde.mjs";

class VSondeCLI {
    constructor() {
        this.log("starting v-sondes-cli...");
        const sonde = new VSonde(this.log);
        sonde.cliId = "1";
        this.sondes = [sonde];

        this.reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "VSonde>",
        });
        this.reader.on("line", (cmd) => {
            this.handleCommand(cmd.toLowerCase().trim());
        });
        this.prompt();
    }

    prompt() {
        readline.cursorTo(process.stdout, 0, process.stdout.getWindowSize()[1]);
        this.reader.prompt(true);
    }

    start() {
        this.log("starting v-sondes...");
        for (let sonde of this.sondes) {
            sonde.start();
        }
    }

    stop() {
        this.log("stopping v-sondes...");
        for (let sonde of this.sondes) {
            sonde.stop();
        }
    }

    exit() {
        this.stop();
        this.reader.close();
        process.exit(0);
    }

    breakStuff(cliId) {
        if (cliId) {
            const sonde = this.sondes.find((sonde) => {
                return sonde.cliId === cliId;
            });
            sonde.break();
        }
    }

    handleCommand(cmd) {
        cmd = cmd.split(" ");
        switch (cmd[0]) {
            case "start":
                this.start();
                break;
            case "stop":
                this.stop();
                break;
            case "exit":
                this.exit();
                break;
            case "break":
                this.breakStuff(cmd[1]);
                break;
            default:
                this.log(`unknown command: ${cmd}`);
        }

        this.prompt();
    }

    log(message) {
        process.stdout.write("\n");
        readline.cursorTo(
            process.stdout,
            0,
            process.stdout.getWindowSize()[1] - 2
        );
        console.log(message);
    }
}

new VSondeCLI();
