import { DatabaseQueries } from "../storage/database.queries";
import { databaseStoredUrlsModel } from "../models/urlChecker.model";

export async function checkURLs (data: databaseStoredUrlsModel[]) {
    console.log("urlChecker.controller / route: check.get / received: ", data);

    try {
        const existingUrls = await DatabaseQueries.checkURLs(data);
        
        if (existingUrls && existingUrls.length > 0) {
            return {status: 200, existingUrls};
        } else {
            return {status: 404, existingUrls};
        };
    } catch (error) {
        console.log("urlChecker.controller / route: check.get / error: controller error", error);
        return {status: 505, }
    };
};