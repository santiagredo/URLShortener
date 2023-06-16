export interface urlRedirectModel {
    url: string
};

export interface URLRedirectResponseModel {
    _id:          ID;
    originalUrl:  string;
    shortenedURL: string;
};

interface ID {
    $oid: string;
};