import { DatabaseQueries } from "../storage/database.queries";
import { urlRedirectModel } from "../models/urlRedirect.model";

export async function redirectURL (data: string) {
    console.log("urlRedirect.controller / route: redirect.get / received: ", data);

    try {
        const query: urlRedirectModel = {
            url: data
        };

        let originalURL = await DatabaseQueries.redirectURL(query);
        
        if (typeof originalURL === "string"){
            return {status: 200, originalURL};
        } else {
            return {status: 404, originalURL: data};
        };
    } catch (error) {
        throw new Error("urlRedirect.controller / route: redirect.get / error: controller error");
    };
};