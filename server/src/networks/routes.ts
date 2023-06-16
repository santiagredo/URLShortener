import { Express } from "express";
import shortenURL from "./urlShortener.network";
import redirectURL from "./urlRedirect.network";
import checkURL from "./urlChecker.network";
import deleteURL from "./urlDeleter.network";
import notFoundUrl from "./urlNotFound.network";

export function routes (server: Express) {
    server.use("/shorten", shortenURL);
    server.use("/check", checkURL);
    server.use("/delete", deleteURL);
    server.use("/404", notFoundUrl);
    server.use("/", redirectURL);
};