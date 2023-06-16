import express from "express";
import { response } from "./response";
import { redirectURL } from "../controllers/urlRedirect.controller";
import { serverConfiguration } from "../server.config";
const app = express();

app.get("/:url", async (req, res) => {
    console.log("urlRedirect.network / route: redirect.get / received: ", req.params.url);

    try {
        const results = await redirectURL(req.params.url);
        
        if (results.status === 200) {
            response.redirect.success(req, res, results?.originalURL, results?.status);
        } else {
            response.redirect.error(req, res, serverConfiguration.SERVER_LINK_ADDRESS_NOT_FOUND, 307);
        };
    } catch (error) {
        response.redirect.error(req, res, serverConfiguration.SERVER_LINK_ADDRESS, 500);
        throw new Error("urlRedirect.network / route: redirect.get / error: network error");
    }
});

export default app;