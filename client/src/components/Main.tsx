import React from "react";
import { apiCalls } from "../network";
import { apiResponseModel, urlShortenerModel } from "../Models/urlsModels";
import { urlShortenerContext } from "../Context/Context";
import { StoredUrls } from "./StoredUrls";
import { Footer } from "./Footer";

export function Main () {
    const context = React.useContext(urlShortenerContext);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [shortUrl, setShortUrl] = React.useState<string>("");
    const [apiResponse, setApiResponse] = React.useState<urlShortenerModel | undefined>(undefined);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const finalUrl = await isValidProtocol(shortUrl);
        
        if (await isValidUrl(finalUrl)) {
            try {
                setLoading(true);
                setShortUrl(finalUrl);
                const results = await fetch(apiCalls.shorten, {
                    method: "POST",
                    body: JSON.stringify({url: finalUrl}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data: apiResponseModel = await results.json();
                console.log(data);

                if (data.shortened) {
                    const payload = data.data;
                    setApiResponse(payload!);
                    context.setStoredUrls([payload, ...context.storedUrls]);
                } else {
                    setApiResponse({
                        originalUrl: "",
                        shortenedURL: "There was a problem processing your request"
                    })
                };
                setLoading(false);
            } catch (error) {
                setApiResponse({
                    originalUrl: "",
                    shortenedURL: "There was a problem processing your request"
                });
                setLoading(false);
            }
        } else {
            setApiResponse({
                originalUrl: finalUrl,
                shortenedURL: ""
            });
        };
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShortUrl(event.target.value);
    };

    const handleClick = () => {
        navigator.clipboard.writeText(`${window.location.href}${apiResponse!.shortenedURL}`);
    };

    const isButtonDisabled = shortUrl.length === 0;

    const handleResponse = () => {
        const sectionClasses = "bg-teal-100 rounded-md flex items-center justify-center flex-col my-2 p-2 text-center";
        const sectionH2Classes = "font-bold py-2 w-11/12 text-center truncate";
        const sectionButtonClasses = "bg-customGreen w-1/2 font-semibold text-white rounded-md my-1 h-7 hover:scale-105";

        if (apiResponse?.shortenedURL.length! > 0 && apiResponse?.originalUrl.length! > 0) {
            return (
                <section className={sectionClasses}>
                    <h2 className={sectionH2Classes}>
                        {apiResponse?.originalUrl}
                    </h2>

                    <h2 className={sectionH2Classes}>
                        {`${window.location.href}${apiResponse?.shortenedURL}`}
                    </h2>

                    <button 
                    onClick={handleClick}
                    className={sectionButtonClasses}
                    >
                        Copy link
                    </button>
                </section>
            );
        } else if (apiResponse?.shortenedURL.length! === 0 && apiResponse?.originalUrl.length! > 0) {
            return (
                <section className={sectionClasses}>
                    <h2 className={sectionH2Classes}>
                        {`${apiResponse?.originalUrl} is not a valid URL`}
                    </h2>
                </section>
            );
        } else {
            return (
                <section className={sectionClasses}>
                    <h2 className={sectionH2Classes}>
                        {`${apiResponse?.shortenedURL}`}
                    </h2>
                </section>
            );
        };
    };

    const mainClasses = "w-11/12 mx-auto my-2 pt-2 max-w-2xl";
    const mainH1Classes = "text-center text-5xl text-customGreen font-semibold pt-5 pb-2.5 my-2";
    const mainPClasses = "text-center text-xl font-light my-2";

    const mainFormInputClasses = "w-full py-8 px-4 h-14 my-2 rounded-md text-xl leading-normal border-solid border border-gray-400";

    const mainFormButtonClasses = `w-full my-2 py-8 px-4 h-14 rounded-md text-xl leading-normal bg-customGreen text-center flex justify-center items-center text-white ${isButtonDisabled && "opacity-50"} ${!isButtonDisabled && "hover:scale-105"}`;

    const mainSectionClasses = "bg-teal-100 w-full font-semibold text-center rounded-md my-2 h-7";

    return (
        <main className={mainClasses}>
            <h1 className={mainH1Classes}>
                URL Shortener
            </h1>
            <p className={mainPClasses}>
                Shorten your URLs and save space with this URL shortener.
            </p>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter a link to shorten it" 
                    className={mainFormInputClasses}
                    value={shortUrl}   
                    onChange={handleChange}
                />
                
                <button 
                    type="submit" 
                    className={mainFormButtonClasses}
                    disabled={isButtonDisabled}
                >
                    Shorten URL
                </button>
            </form>

            {!loading && apiResponse && handleResponse()}
            {loading && (
                <section className={mainSectionClasses}>
                    Loading
                </section>
            )}
        
            {StoredUrls()}

            <Footer/>
        </main>
    );
};



async function isValidUrl (url: string) {
    const urlRegex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"); 

    const secondUrlRegex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

    try {
        if (urlRegex.test(url) || secondUrlRegex.test(url)) {
            // console.log("The URL is valid");
            return true;
        };
    } catch (error) {
        console.log("The URL is not valid");
        return false;
    }
};

function isValidProtocol (shortUrl: string) {
    const urlRegex = /^(http|https|ftp):\/\//i;

    let finalUrl = shortUrl;

    if (urlRegex.test(finalUrl)) {
        // console.log("URL has valid protocol", finalUrl);
        return finalUrl;
    } else {
        // console.log("URL has no valid protocol, modifying");
        finalUrl = `http://${finalUrl}`;
        // console.log(finalUrl);
        return finalUrl;
    };
};
