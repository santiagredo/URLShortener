const environment = "DEVELOPMENT";
// const environment = "PRODUCTION";

const shortenUrlApiCall = environment === "DEVELOPMENT" ?  
    "http://localhost:3000/shorten/" : 
    "https://us-rinp.onrender.com/shorten";

const checkStoredUrlsApiCall = environment === "DEVELOPMENT" ?  
    "http://localhost:3000/check/" : 
    "https://us-rinp.onrender.com/check";

const deleteUrlApiCall = environment === "DEVELOPMENT" ?  
    "http://localhost:3000/delete" : 
    "https://us-rinp.onrender.com/delete";

export const apiCalls = {
    shorten: shortenUrlApiCall,
    check: checkStoredUrlsApiCall,
    delete: deleteUrlApiCall
};