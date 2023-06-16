export interface apiResponseModel {
    data: urlShortenerModel,
    shortened: boolean
};

export interface urlShortenerModel {
    originalUrl: string,
    shortenedURL: string,
    _id?: string,
    createdAt?: Date
};

export const localstorageUrlsName = "shortenedURLs";