import React from "react";
import { localstorageUrlsName, urlShortenerModel } from "../Models/urlsModels";
import { urlShortenerContext } from "../Context/Context";
import { apiCalls } from "../network";

export function StoredUrls () {
    const context = React.useContext(urlShortenerContext);


    React.useEffect(() => {
        if (context.storedUrls.length > 0) {
            window.localStorage.setItem(localstorageUrlsName, JSON.stringify(context.storedUrls));
        };
        // console.log(JSON.parse(window.localStorage.getItem(localstorageUrlsName)!));
        // console.log("Context: ", context.storedUrls);
    }, [context.storedUrls]);

    React.useEffect(() => {
        async function checkStoredUrls () {
            let localStoredUrlsFn: urlShortenerModel[] = Boolean(window.localStorage.getItem(localstorageUrlsName)) ?
                JSON.parse(window.localStorage.getItem(localstorageUrlsName)!) :
                [];

            if (localStoredUrlsFn.length > 0) {
                const response = await fetch(apiCalls.check, {
                    method: "POST",
                    body: JSON.stringify({ urls: localStoredUrlsFn}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const {data} = await response.json();
                // console.log(data);

                if (typeof data !== "string") {
                    context.setStoredUrls(data);
                };
            };
        };
        checkStoredUrls();
    }, []);

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    const handleDelete = async (url: urlShortenerModel) => {
        try {
            const response = await fetch(apiCalls.delete, {
                method: "DELETE",
                body: JSON.stringify({ url: url.shortenedURL}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const {data} = await response.json();
            const value: urlShortenerModel = data.value;
            // console.log(data);
            // console.log(value);
            if (value.shortenedURL === url.shortenedURL) {
                const filteredUrls = context.storedUrls.filter((ele) => ele.shortenedURL !== url.shortenedURL);
                // console.log("Tester: ", filteredUrls);
                context.setStoredUrls(filteredUrls);
            };
        } catch (error) {
            console.log(error);
            alert("There was a problem deleting this URL, please try again later");
        };
    };
 
    const mainClasses = "mx-auto my-2 pt-2";

    const articleClasses = "bg-teal-100 rounded-md flex flex-col md:flex-row justify-between my-2 p-2 text-center";
    const articleDivClasses = "truncate w-full block flex flex-col items-center justify-center truncate"
    const articleDivH2Classes = "font-bold py-2 truncate";
    const articleDivPClasses = "py-2 truncate";
    const articleDivButtonClasses = "bg-customGreen w-1/2 font-semibold text-white rounded-md my-1 h-7 hover:scale-110";

    return (
        <div className={mainClasses}>
            {context.storedUrls.map((ele, index) => {

                return (
                    <article key={String(index)} className={articleClasses}>
                        <div className={articleDivClasses}>
                            <h2 className={articleDivH2Classes}>
                                {`${window.location.href}${ele.shortenedURL}`}
                            </h2>

                            <p className={articleDivPClasses}>
                                {ele.originalUrl}
                            </p>
                        </div>

                        <div className={articleDivClasses}>
                            <button 
                                onClick={() => handleCopy(`${window.location.href}${ele.shortenedURL}`)}
                                className={articleDivButtonClasses}
                                >
                                    Copy link
                            </button>

                            <button 
                                onClick={() => handleDelete(ele)}
                                className={articleDivButtonClasses}
                                >
                                Delete
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};