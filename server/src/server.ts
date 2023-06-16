import express from "express";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env", debug: false});
import { routes } from "./networks/routes";
import cors from "cors";
import { serverConfiguration } from "./server.config";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('*.css', function(req, res) {
    // console.log(`Serving CSS file: ${req.url}`);
    res.sendFile(path.join(__dirname, "../../client/dist", req.url));
});
app.use(express.static(path.join(__dirname, "../../client/dist")));

routes(app);

app.listen(serverConfiguration.PORT, () => console.log(`App runing on port: ${serverConfiguration.PORT}`));