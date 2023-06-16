const homeIcon = new URL("../../public/home.png", import.meta.url).href;
const githubIcon = new URL("../../public/github.png", import.meta.url).href; 
const linkedinIcon = new URL("../../public/linkedin.png", import.meta.url).href; 


export function Header () {
    const headerClasses = "w-full h-20 max-h-20 px-7 bg-customGreen text-white flex items-center justify-center";

    const divClasses = "w-full max-w-lg flex items-center justify-between";
    const figureClasses = "w-8 hover:cursor-pointer hover:scale-110";
    const imgClasses = "w-full"; 


    return (
        <header className={headerClasses}>
            <div className={divClasses}>
                <a href="/">
                    <figure className={figureClasses}>
                        <img alt="home icon" src={homeIcon} className={imgClasses}/>
                    </figure>
                </a>
            
                <a href="https://www.linkedin.com/in/santiago-sabogal-266525247/" target="_blank">
                    <figure className={figureClasses}>
                        <img alt="linkedin icon" src={linkedinIcon} className={imgClasses}/>
                    </figure>
                </a>

                <a href="https://github.com/santiagredo/URLShortener" target="_blank">
                    <figure className={figureClasses}>
                        <img alt="github icon" src={githubIcon} className={imgClasses}/>
                    </figure>
                </a>
            </div>
        </header>
    );
};