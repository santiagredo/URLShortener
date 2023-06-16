import express from "express";
import { response } from "./response";
import { checkURLs } from "../controllers/urlChecker.controller";
const app = express();

app.post("/", async (req, res) => {
    console.log("urlChecker.network / route: check.get / received: ", req.body);

    try {
        const result = await checkURLs(req.body.urls);
        console.log(result);

        if (result.status === 200) {
            response.check.success(req, res, result.existingUrls!, result.status);
        } else if (result.status === 404) {
            response.check.error(req, res, `Error: Couldn't find Urls:`, 418);
        } else {
            response.check.error(req, res, `Error: Couldn't find Urls:`, 418);
        };
    } catch (error) {
        response.check.error(req, res, `There was a problem processing your request`, 500);
        console.log("urlShortener.network / route: shorten.post / error: network error", error);
    }
});

export default app;