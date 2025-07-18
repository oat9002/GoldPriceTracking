import cors from "cors";
import "dotenv/config";
import express from "express";
import * as dbDecorator from "./dal/dbDecorator";
import * as mackerel from "./service/mackerelServie";
import * as track from "./service/trackingService";
import { StatusCode } from "./util/enums";

const port = process.env.API_PORT ?? 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hello, welcome to GoldpriceTracking.");
});

app.get("/prices", async (req, res) => {
    const numOfLatestPrice: number = parseInt((req.query?.number as string) ?? "-1");
    if (numOfLatestPrice < 0) {
        res.status(StatusCode.badRequest);
        res.send("number must be more than or equal to 0");
    }

    try {
        const data = await dbDecorator.getLatestPrices(numOfLatestPrice);
        res.status(StatusCode.okay);
        res.json(data);
    } catch (err: unknown) {
        res.status(StatusCode.InternalServerError);
        res.json(err);
    }
});

app.get("/retrieveAndSavePrice", async (_, res) => {
    await track.retrieveAndSavePrice();
    res.status(StatusCode.okay);
    res.send("success");
});

app.get("/priceslastday", async (req, res) => {
    const days = parseInt((req.query?.days as string) ?? "-1");
    if (days < 0) {
        res.status(StatusCode.badRequest);
        res.send("days must be more than or equal to 0");
    } else {
        try {
            const data = await dbDecorator.getPricesLastByDay(days);
            res.status(StatusCode.okay);
            res.json(data);
        } catch (err: unknown) {
            res.status(StatusCode.InternalServerError);
            res.json(err);
        }
    }
});

app.post("/donate", async (_, res) => {
    res.status(StatusCode.NotSupport);
    res.json("Not supported");
});

app.listen(port, () => {
    console.log("listen to port " + port);
});

track.start();
mackerel.intervalDoHealthCheck();
