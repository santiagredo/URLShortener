import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${encodeURIComponent(process.env.DATABASE_USERNAME!)}:${encodeURIComponent(process.env.DATABASE_PASSWORD!)}@${encodeURIComponent(process.env.DATABASE_CLUSTER_NAME!)}/?retryWrites=true&w=majority`;
const databaseName = process.env.DATABASE_NAME!;
const databaseCollectionName = process.env.DATABASE_COLLECTION!;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
const database = client.db(databaseName);
export const urlsCollection = database.collection(databaseCollectionName);

export async function connectDatabase () {
    await client.connect();
    console.log("Connected successfully to the database");
};

export async function disconnectDatabase () {
    client.close();
    console.log("Database connection finalized");
};