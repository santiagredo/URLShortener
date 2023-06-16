import { urlShortenerModel } from "../models/urlShortener.model";
import { urlsCollection, connectDatabase, disconnectDatabase } from "./database";
import { urlRedirectModel, URLRedirectResponseModel } from "../models/urlRedirect.model";
import { databaseStoredUrlsModel } from "../models/urlChecker.model";
import { urlDeleterModel } from "../models/urlDeleter.model";


async function addShortenedURL (document: urlShortenerModel) {
    console.log("urlShortener.storage.addShortenedURL / route: shorten.post / received: ", document);

    try {
        await connectDatabase();
        const parsedDocument = {
            createdAt: new Date(),
            originalUrl: document.originalUrl,
            shortenedURL: document.shortenedURL
        }
        console.log("Parsed document: ", parsedDocument)
        const insertedDocument = await urlsCollection.insertOne(parsedDocument);
        console.log("Inserted document: ", insertedDocument);
        return 201;
    } catch (error) {
        console.log("urlShortener.storage / route: shortener.post / error: database error", error);
    } finally {
        disconnectDatabase();
    };
};

async function redirectURL (data: urlRedirectModel) {
    console.log("urlRedirect.storage.redirectURL / route: redirect.get / received: ", data);

    try {
        await connectDatabase();
        const result: URLRedirectResponseModel | null = await urlsCollection.findOne({ "shortenedURL": data.url}) as URLRedirectResponseModel | null;
        console.log("Found URL: ", result?.originalUrl);
        return result?.originalUrl;
    } catch (error) {
        console.log("urlRedirect.storage / route: redirect.get / error: database error", error);
    } finally {
        disconnectDatabase();
    };
};

async function isNewURL (url: string) {
    console.log("urlShortener.storage.isNewURL / route: shorten.post / received: ", url);

    try {
        await connectDatabase();
        const existingDocument = await urlsCollection.findOne({ "shortenedURL": url});
        
        if (existingDocument === null) {
            console.log("The URL is new");
            return true;
        } else {
            console.log("The URL is NOT new");
            return false;
        };
    } catch (error) {
        console.log("urlRedirect.storage / route: redirect.get / error: database error", error);
    } finally {
        disconnectDatabase();
    };   
};

async function checkURLs (data: databaseStoredUrlsModel[]) {
    console.log("urlChecker.storage / route: check.get / received: ", data);

    const shortenedURLs = data.map(obj => obj.shortenedURL);
    console.log(shortenedURLs)

    try {
        await connectDatabase();
        const existingDocuments = await urlsCollection.find({ "shortenedURL": { $in: shortenedURLs}}).toArray();

        const parsedExistingDocuments: databaseStoredUrlsModel[] = existingDocuments.map(document => ({
            _id: String(document._id),
            originalUrl: document.originalUrl,
            shortenedURL: document.shortenedURL
        }));

        console.log("Existing documents: ", existingDocuments);
        console.log("Parsed Documents: ", parsedExistingDocuments)
        return (parsedExistingDocuments)
    
    } catch (error) {
        console.log("urlChecker.storage / route: check.get / error: database error", error);
    } finally {
        //Timeout to prevent erros when disconnecting from a data base when there are no active connections
        setTimeout(() => {
            disconnectDatabase();
        }, 1000);
    };
};

async function deleteURL (data: urlDeleterModel) {
    console.log("urlDeleter.storage / route: delete.delete / received: ", data);

    try {
        await connectDatabase();
        const deleteUrl = await urlsCollection.findOneAndDelete({ "shortenedURL" : data.url});
        console.log(deleteUrl);
        return (deleteUrl);
    } catch (error) {
        console.log("urlDeleter.storage / route: delete.delete / error: database error", error);
    } finally {
        disconnectDatabase();
    };
};

export const DatabaseQueries = {
    addShortenedURL: addShortenedURL,
    redirectURL: redirectURL,
    isNewURL: isNewURL,
    checkURLs: checkURLs,
    deleteURL: deleteURL
};