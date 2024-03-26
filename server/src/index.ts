import cors from "cors";
import "dotenv/config";
import express from "express";
import * as dbDecorator from "./dal/dbDecorator";
import * as mackerel from "./service/MackerelServie";
import * as track from "./service/TrackingService";
import { StatusCode } from "./util/enums";
import useSwagger from "./middleware/swagger";

const port = process.env.API_PORT ?? 4000;
const app = express();

app.use(cors());
app.use(express.json());

/**
 * @openapi
 * /:
 *  get:
 *     description: Welcome to GoldpriceTracking
 *     responses:
 *          200:
 *              description: Welcome to GoldpriceTracking
 */
app.get("/", (_, res) => {
    res.send("Hello, welcome to GoldpriceTracking.");
});

/**
 * @openapi
 * /prices:
 *  get:
 *     description: Get latest prices
 *     parameters:
 *          - in: query
 *              name: number
 *              schema:
 *                  type: integer
 *              description: number of latest prices
 *              required: false
 *   responses:
 *     200:
 *      description: Get latest prices
 *    content:
 *     application/json:
 *     schema:
 *     type: array
 *    items:
 *    type: object
 *   properties:
 *   id:
 *   type: integer
 *  price:
 *  type: number
 * date:
 * type: string
 * example:
 * id: 1
 * price: 100
 * date: 2021-01-01
 *    400:
 *     description: number must be more than or equal to 0
 *   500:
 *   description: Internal Server Error
 */
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

useSwagger(app);

app.listen(port, () => {
    console.log("listen to port " + port);
});

track.start();
mackerel.intervalDoHealthCheck();
