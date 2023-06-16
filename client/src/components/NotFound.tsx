import { Link } from "react-router-dom";

const notFoundIcon = new URL("../../public/page-not-found.svg", import.meta.url).href;

export function NotFound () {

    const divClasses = "w-11/12 mx-auto my-2 pt-2 max-w-lg text-center";
    const divFigureClasses = "w-8/12  mx-auto";
    const divFigureImgClasses = "w-full h-full";
    const divH2Classes = "my-2";
    const divLinkClasses = "text-blue-600 hover:underline";

    return (
        <div className={divClasses}>
            <figure className={divFigureClasses}>
                <img alt="Not found icon" src={notFoundIcon} className={divFigureImgClasses}/>
            </figure>
            <h2 className={divH2Classes}>
                It seems you are trying to access a URL that doesn't exist :(
            </h2>
            <Link to="/" className={divLinkClasses}>Take me home then</Link>
        </div>
    );
};