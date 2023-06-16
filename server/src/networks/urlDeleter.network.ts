import express from "express";
import { response } from "./response";
import { deleteURL } from "../controllers/urlDeleter.controller";
const app = express();

app.delete("/", async (req, res) => {
    console.log("urlDeleter.network / route: delete.delete / received: ", req.body);

    try {
        const result = await deleteURL(req.body);

        response.delete.success(req, res, result, 200);
    } catch (error) {
        response.shorten.error(req, res, `There was a problem processing your request`, 500);
        console.log("urlDeleter.network / route: delete.delete / error: network error", error);
    }
});

export default app;