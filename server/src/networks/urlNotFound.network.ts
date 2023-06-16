import express from "express";
// import { response } from "./response";
// import { redirectURL } from "../controllers/urlRedirect.controller";
const app = express();
import path from "path";

app.get("/", async (req, res) => {
    console.log("urlNotFound.network / route: 404.get / received: ", req.params);

    res.sendFile(path.join(__dirname, "../../../client/dist", "index.html"));
});

export default app;