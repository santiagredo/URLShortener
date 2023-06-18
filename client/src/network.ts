const isEnvironmentDevelopment = false;
// const isEnvironmentDevelopment = true;

const shortenUrlApiCall = (isEnvironmentDevelopment)
    ? "http://localhost:3000/shorten/"  
    : "https://us-rinp.onrender.com/shorten";

const checkStoredUrlsApiCall = (isEnvironmentDevelopment)   
    ? "http://localhost:3000/check/"  
    : "https://us-rinp.onrender.com/check";

const deleteUrlApiCall = (isEnvironmentDevelopment)   
    ? "http://localhost:3000/delete"  
    : "https://us-rinp.onrender.com/delete";

export const apiCalls = {
    shorten: shortenUrlApiCall,
    check: checkStoredUrlsApiCall,
    delete: deleteUrlApiCall
};