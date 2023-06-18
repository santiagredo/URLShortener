type Environment = "PRODUCTION" | "DEVELOPMENT";

// const environment: Environment = "DEVELOPMENT";
const environment: Environment = "PRODUCTION";

const shortenUrlApiCall = (environment === "DEVELOPMENT" as Environment)
    ? "http://localhost:3000/shorten/"  
    : "https://us-rinp.onrender.com/shorten";

const checkStoredUrlsApiCall = (environment === "DEVELOPMENT" as Environment)   
    ? "http://localhost:3000/check/"  
    : "https://us-rinp.onrender.com/check";

const deleteUrlApiCall = (environment === "DEVELOPMENT" as Environment)   
    ? "http://localhost:3000/delete"  
    : "https://us-rinp.onrender.com/delete";

export const apiCalls = {
    shorten: shortenUrlApiCall,
    check: checkStoredUrlsApiCall,
    delete: deleteUrlApiCall
};