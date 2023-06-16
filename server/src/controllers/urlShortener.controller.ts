import { DatabaseQueries } from "../storage/database.queries";
import { urlShortenerModel } from "../models/urlShortener.model";
import crypto from "crypto";
import { serverConfiguration } from "../server.config";




export async function shortenURL (data: string) {
    console.log("urlShortener.controller / route: shorten.post / received: ", data);

    let urlProtocol = await isValidProtocol(data);

    try {
        if (await isValidUrl(urlProtocol)) {
            const randomString = await generateRandomString();        

            let document: urlShortenerModel = {
                originalUrl: String(urlProtocol),
                shortenedURL: randomString
            };


            const status = await DatabaseQueries.addShortenedURL(document);

            if (status === 201) {
                return {status, document};
            } else {
                return {status: 500, randomString: data};
            };
        } else {
            return {status: 404, randomString: data};
        };
    } catch (error) {
        throw new Error("urlShortener.controller / route: shorten.post / error: controller error");
    }
};


async function isValidUrl (url: string) {
    const urlRegex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"); 

    const secondUrlRegex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

    try {
        if (urlRegex.test(url) || secondUrlRegex.test(url)) {
            console.log("The URL is valid");
            return true;
        };
    } catch (error) {
        console.log("The URL is not valid");
        return false;
    }
};

function isValidProtocol (shortUrl: string) {
    const urlRegex = /^(http|https|ftp):\/\//i;

    let finalUrl = shortUrl;

    if (urlRegex.test(finalUrl)) {
        console.log("URL has a valid protocol", finalUrl);
        return finalUrl;
    } else {
        console.log("URL has no valid protocol, modifying");
        finalUrl = `http://${finalUrl}`;
        console.log(finalUrl);
        return finalUrl;
    };
};

async function generateRandomString (): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const amountToParse = serverConfiguration.AMOUNT_OF_CHARACTERS_TO_RANDOMIZE;
    let randomString = "";

    for (let i = 0; i < amountToParse; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        randomString += characters[randomIndex];
    };
    
    if (await DatabaseQueries.isNewURL(randomString)) {
        return randomString;
    } else {
        return generateRandomString();
    };
};