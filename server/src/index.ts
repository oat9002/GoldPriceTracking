import cors from "cors";
import "dotenv/config";
import express from "express";
import * as dbDecorator from "./dal/dbDecorator";
import * as mackerel from "./service/mackerelServie";
import * as track from "./service/trackingService";
import { StatusCode } from "./util/enums";
import {
    WelcomeResponse,
    GetPricesResponse,
    GetPricesLastDayResponse,
    RetrieveAndSavePriceResponse,
    DonateResponse,
} from "./models/Response";

const port = process.env.API_PORT ?? 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    const response: WelcomeResponse = {
        message: "Hello, welcome to GoldpriceTracking.",
    };
    res.status(StatusCode.okay).json(response);
});

app.get("/prices", async (req, res) => {
    const numOfLatestPrice: number = parseInt((req.query?.number as string) ?? "-1");
    if (numOfLatestPrice < 0) {
        const response: GetPricesResponse = {
            error: {
                message: "number must be more than or equal to 0",
            },
        };

        return res.status(StatusCode.badRequest).json(response);
    }

    try {
        const data = await dbDecorator.getLatestPrices(numOfLatestPrice);
        const response: GetPricesResponse = { prices: data };

        return res.status(StatusCode.okay).json(response);
    } catch (err: unknown) {
        const response: GetPricesResponse = {
            error: {
                message: err instanceof Error ? err.message : "Internal server error",
            },
        };
        return res.status(StatusCode.InternalServerError).json(response);
    }
});

app.get("/retrieveAndSavePrice", async (_, res) => {
    try {
        await track.retrieveAndSavePrice();

        const response: RetrieveAndSavePriceResponse = {
            isSuccess: true,
        };

        res.status(StatusCode.okay).json(response);
    } catch (err: unknown) {
        const response: RetrieveAndSavePriceResponse = {
            isSuccess: false,
            error: {
                message: err instanceof Error ? err.message : "Internal server error",
            },
        };
        res.status(StatusCode.InternalServerError).json(response);
    }
});

app.get("/priceslastday", async (req, res) => {
    const days = parseInt((req.query?.days as string) ?? "-1");
    if (days < 0) {
        const response: GetPricesLastDayResponse = {
            error: {
                message: "days must be more than or equal to 0",
            },
        };
        return res.status(StatusCode.badRequest).json(response);
    }

    try {
        const data = await dbDecorator.getPricesLastByDay(days);
        const response: GetPricesLastDayResponse = { prices: data };

        return res.status(StatusCode.okay).json(response);
    } catch (err: unknown) {
        const response: GetPricesLastDayResponse = {
            error: {
                message: err instanceof Error ? err.message : "Internal server error",
            },
        };
        return res.status(StatusCode.InternalServerError).json(response);
    }
});

app.post("/donate", async (_, res) => {
    const response: DonateResponse = {
        error: {
            message: "Not supported",
        },
    };
    res.status(StatusCode.NotSupport).json(response);
});

app.listen(port, () => {
    console.log("listen to port " + port);
});

track.start();
mackerel.intervalDoHealthCheck();
