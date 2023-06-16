import { DatabaseQueries } from "../storage/database.queries";
import { urlDeleterModel } from "../models/urlDeleter.model";

export async function deleteURL (data: urlDeleterModel) {
    console.log("urlDeleter.controller / route: delete.delete / received: ", data);

    try {
        const deleteUrl = await DatabaseQueries.deleteURL(data);

        return deleteUrl;
    } catch (error) {
        throw new Error("urlDelete.controller / route: delete.delete / error: controller error");
    };
};