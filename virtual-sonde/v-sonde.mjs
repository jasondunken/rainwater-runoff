export default class VSonde {
    SERVER_URL = "http://localhost:3000/sondes";
    SERVER_PUBLIC_KEY = "";
    SONDE_UUID = "cb73430a-3add-4ccb-a7d4-c973da5028fd";
    SONDE_API_PASSWORD = "v-sonde-pw";

    SAMPLE_RATE = 5000; //ms

    data = [
        "2024-01-18 18:15:00", // datetime
        "-5", // utc offset
        "2024-01-18 13:15:00", // datetime + offset
        "0.0", // conductance
        "-4.3", // water depth
        "22.2", // temp
        "4.67", // batt voltage - sensor
        "17.74", // humidity - sensor
        "25.59", // temp - sensor
        "100.0", // signal percent - sensor
    ];

    timer;

    constructor(logger) {
        this.log = logger;
        this.register();
    }

    register() {
        const data = {
            UUID: this.SONDE_UUID,
            password: this.SONDE_API_PASSWORD,
        };
        fetch(this.SERVER_URL + "/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                res = await res.json();
                this.log(("[SONDE] registered: ", res));
            })
            .catch((err) => {
                this.log(("[SONDE] registration error: ", err.code));
            });
    }

    start() {
        this.timer = setInterval(() => this.report(), this.SAMPLE_RATE);
    }

    stop() {
        clearInterval(this.timer);
    }

    report() {
        const data = {
            sondeId: this.SONDE_UUID,
            sondePw: this.SONDE_API_PASSWORD,
            data: this.getNextData(),
        };
        fetch(this.SERVER_URL + "/report", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                res = await res.json();
                this.log(("[SONDE]res: ", res));
            })
            .catch((err) => {
                this.log(("[SONDE]error: ", err.code));
            });
    }

    getNextData() {
        const newData = [...this.data];
        // update timestamps
        const lastTime = new Date(newData[0]);
        lastTime.setMinutes(lastTime.getMinutes() + this.SAMPLE_RATE / 1000);
        newData[0] = this.formatDate(lastTime);

        lastTime.setHours(lastTime.getHours() + parseInt(newData[1]));
        newData[2] = this.formatDate(lastTime);
        this.data = [...newData];

        // break stuff here
        if (this.breakStuff) {
            console.log("generating broken data!");
            /**
             * here are the criteria when the rainwater missing data Alert App should send an alert to user via (email and/or text), if:
             * 1. the missing timestep is greater than 15-minutes for depth, conductivity, or temperature
             * 2. any data not-a-number
             * 3. water depth in the rain barrel <25 mm
             * 4. water depth in the rain barrel >890 mm (barrel max. height)
             * 5. conductivity < 2 µS/cm and > 1000 µS/cm
             * 6. temperature below 0 °C, and temperature beyond -40 °C to +60 °C
             */

            // date, utc offset, and date w/offset are columns 0-2
            // sensor values are columns >= 3
            const colId = Math.floor(Math.random() * (newData.length - 3) + 3);
            newData[colId] = undefined;

            this.breakStuff = false;
        }

        return newData;
    }

    breakStuff = false;
    break() {
        this.breakStuff = true;
    }

    formatDate(date) {
        const S = this.leftPad("" + date.getSeconds(), 2);
        const m = this.leftPad("" + date.getMinutes(), 2);
        const H = this.leftPad("" + date.getHours(), 2);
        const D = this.leftPad("" + date.getDate(), 2);
        const M = this.leftPad("" + (date.getMonth() + 1), 2);
        const Y = date.getFullYear();
        return `${Y}-${M}-${D} ${H}:${m}:${S}`;
    }

    leftPad(val, len) {
        while (val.length < len) {
            val = "0" + val;
        }
        return val;
    }
}
