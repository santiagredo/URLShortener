import React from "react";
import { urlShortenerModel } from "../Models/urlsModels";

interface ContextModel {
    storedUrls: urlShortenerModel[];
    setStoredUrls: React.Dispatch<React.SetStateAction<urlShortenerModel[]>>;
};

export const urlShortenerContext = React.createContext<ContextModel>({
    storedUrls: [],
    setStoredUrls: () => {}
}); 

interface ContextProps {
    children: JSX.Element
};

export function URLShortenerContextProvider ({ children }: ContextProps) {
    const [storedUrls, setStoredUrls] = React.useState<urlShortenerModel[]>([]);

    return (
        <urlShortenerContext.Provider value={{
            storedUrls,
            setStoredUrls,
        }}>
            {children}
        </urlShortenerContext.Provider>
    );
};