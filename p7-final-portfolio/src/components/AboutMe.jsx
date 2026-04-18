//this will house the parallax of my journey
import shape from "../assets/star-10.svg";

export const AboutMe = () => {
    return (
        <>
        <section id="about-me" className="about-me">

        <div>
            <div className="flex place-content-between m-2">
                <h1 className="text-8xl text-iceblue font-archivo p-6 sm:1/3 md:w-1/2">Albien Joy Sison</h1>
                <img src={shape} className="w-1/8 place-content-end" />               
            </div>

            <div className="text-2xl bg-iceblue m-auto w-9/10 p-10 text-center">
                <div>Full-stack developer | Editor | Writer </div>
                <div>Creativity and code in one package</div>
                <div>Manila-based global thinker </div>     
            </div>
        </div>

        <div className="header">What led me here</div>
            <div className="w-full h-screen overflow-hidden relative grid place-items-center">
            <h1 className="font-bold text-white text-7xl md:text-9xl relative z-10"></h1>
            </div>


        </section>
        </>

    );
};
