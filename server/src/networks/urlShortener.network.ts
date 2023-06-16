import express from "express";
import { response } from "./response";
import { shortenURL } from "../controllers/urlShortener.controller";
const app = express();

app.post("/", async (req, res) => {
    console.log("urlShortener.network / route: shorten.post / received: ", req.body.url);

    try {
        const result = await shortenURL(req.body.url);

        if (result.status === 201) {
            response.shorten.success(req, res, result.document!, result.status);
        } else if (result.status === 404) {
            response.shorten.error(req, res, `Error: ${req.body.url} is not a valid URL`, 418);
        } else {
            response.shorten.error(req, res, `There was a problem processing your request`, 500);
        };
    } catch (error) {
        response.shorten.error(req, res, `There was a problem processing your request`, 500);
        throw new Error("urlShortener.network / route: shorten.post / error: network error");
    }
});

export default app;