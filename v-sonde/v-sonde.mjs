export default class VSonde {
    SERVER_URL = "http://localhost:3000/sonde/";
    SERVER_PUBLIC_KEY = "";
    SONDE_UUID = "cb73430a-3add-4ccb-a7d4-c973da5028fd";
    SONDE_API_PASSWORD = "v-sonde-pw";

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

    constructor(uuid, logger) {
        // this.SONDE_UUID = uuid;
        this.log = logger;
    }

    update() {
        const data = { id: this.SONDE_UUID, pw: this.SONDE_API_PASSWORD, data: this.getNextData() };
        fetch(this.SERVER_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                res = await res.json();
                this.log(`[SONDE]res: ${res}`);
            })
            .catch((err) => {
                this.log(`[SONDE]error: ${err.code}`);
            });
    }

    getNextData() {}
}
