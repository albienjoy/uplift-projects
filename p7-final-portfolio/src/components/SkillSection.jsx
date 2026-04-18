/*
As a user, I can learn about your skills. (10 points)
Acceptance criteria
I can click a link to view/download your updated resume.
I can see a list of technologies and stacks that you use. 
Each technology and stack should be represented by an image icon/logo with an alt text.
 */
import { BiLogoJavascript, BiLogoMicrosoft, BiBrush, BiLogoFigma, BiBugAlt, BiLogoHtml5, BiLogoProductHunt, BiBadgeCheck, BiLogoTypescript, BiLogoCss3, BiLogoReact, BiLogoMongodb, BiSolidNetworkChart, BiLogoNodejs } from "react-icons/bi";
import star from "../assets/star-irreg.svg"

export const SkillSection = () => {
    return (
        <>
        <section id="skills" className="skills">
            <div className="skill-title flex align-middle">
            <img src={star} className="h-36 bg-blue-700" />            
            <h1 className="header p-10 h-1/2 m-auto">Skills and technologies</h1>
            <img src={star} className="h-36 bg-blue-700" />            
            </div>
            <div className="skill-text grid grid-cols-3 place-content-center m-auto">
                <p><BiLogoJavascript size="3em" /> Javascript</p>
                <p><BiLogoTypescript size="3em" /> Typescript</p>
                <p><BiLogoHtml5 size="3em" /> HTML</p>
                <p><BiLogoCss3 size="3em" /> CSS</p>
                <p><BiLogoMongodb size="3em" /> MongoDB</p>
                <p><BiSolidNetworkChart size="3em" /> ExpressJS</p>
                <p><BiLogoReact size="3em" /> React</p>
                <p><BiLogoNodejs size="3em" /> NodeJs</p>
            </div>

            <h2 className="text-3xl font-bold m-6 text-center">Technical skills</h2>                
            <div className="skill-text grid grid-cols-3 place-content-center">
                <p><BiBadgeCheck size="3em" /> Unit testing with Jest</p>
                <p><BiBugAlt size="3em"/> Debugging</p>
            </div>

            <h2 className="text-3xl font-bold m-6 text-center">Other software</h2>
            <div className="skill-text">
                <p><BiLogoFigma size="3em" />Figma</p>
                <p><BiBrush size="3em" />Canva</p>
                <p><BiLogoMicrosoft size="3em" />Microsoft Office Suite</p>
                <p><BiLogoProductHunt size="3em" />Postman</p>
            </div>
        </section>
        </>
    );
};
