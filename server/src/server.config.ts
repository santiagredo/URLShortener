const isEnvironmentDevelopment = false;
// const isEnvironmentDevelopment = true;

const SERVER_LINK_ADDRESS = (isEnvironmentDevelopment)  
    ? "http://localhost:3000/"  
    : "https://us-rinp.onrender.com/";
 
const SERVER_LINK_ADDRESS_NOT_FOUND = (isEnvironmentDevelopment)   
    ? "http://localhost:3000/404"  
    : "https://us-rinp.onrender.com/404";

export const serverConfiguration = {
    PORT: 3000,
    SERVER_LINK_ADDRESS: SERVER_LINK_ADDRESS,
    SERVER_LINK_ADDRESS_NOT_FOUND: SERVER_LINK_ADDRESS_NOT_FOUND, 
    AMOUNT_OF_CHARACTERS_TO_RANDOMIZE: 6
};