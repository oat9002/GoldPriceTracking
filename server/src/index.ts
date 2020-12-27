import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import "dotenv/config";
import express from "express";
import * as db from "./dal/db";
import * as dockerService from "./service/DockerService";
import * as track from "./service/TrackingService";
import { STATUS_CODE } from "./util/enums";
const port = 4000;

const whitelist = [
    "http://localhost",
    "https://dg.oatto.com",
    "https://goldpricetracking.web.app",
    "https://registry.hub.docker.com",
];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin && whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
const jsonParser = bodyParser.json();
const app = express();

app.use(cors(corsOptions));

app.get("/", (_, res) => {
    res.send("Hello, welcome to GoldpriceTracking.");
});

app.get("/prices", async (req, res) => {
    const numOfLatestPrice: number = parseInt(
        (req.query?.number as string) ?? "-1"
    );
    if (numOfLatestPrice < 0) {
        res.status(STATUS_CODE.BAD_REQUEST);
        res.send("number must be more than or equal to 0");
    }

    try {
        const data = await db.getLatestPrices(numOfLatestPrice);
        res.status(STATUS_CODE.OKAY);
        res.json(data);
    } catch (err) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR);
        res.json(err);
    }
});

app.get("/retrieveAndSavePrice", async (_, res) => {
    await track.retrieveAndSavePrice();
    res.status(STATUS_CODE.OKAY);
    res.send("Success");
});

app.get("/priceslastday", async (req, res) => {
    const days = parseInt((req.query?.days as string) ?? "-1");
    if (days < 0) {
        res.status(STATUS_CODE.BAD_REQUEST);
        res.send("days must be more than or equal to 0");
    } else {
        try {
            const data = await db.getPricesLastByDay(days);
            res.status(STATUS_CODE.OKAY);
            res.json(data);
        } catch (err) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR);
            res.json(err);
        }
    }
});

app.post("/dockerDeploy", jsonParser, async (req, res) => {
    const isValid = await dockerService.validateDeploymentRequest(req.body);
    if (!isValid) {
        res.sendStatus(STATUS_CODE.BAD_REQUEST);
        return;
    }

    res.sendStatus(STATUS_CODE.OKAY);
});

app.listen(port, () => {
    console.log("listen to port " + port);
});

track.start();
