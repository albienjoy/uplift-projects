/*
As a user, I can learn about your skills. (10 points)
Acceptance criteria
I can click a link to view/download your updated resume.
I can see a list of technologies and stacks that you use. 
Each technology and stack should be represented by an image icon/logo with an alt text.
 */
import { BiLogoJavascript, BiLogoMicrosoft, BiLogoFigma, BiBugAlt, BiLogoHtml5, BiBadgeCheck, BiLogoTypescript, BiLogoCss3, BiLogoReact, BiLogoMongodb, BiLogoNodejs } from "react-icons/bi";
import { SiCanva, SiPostman, SiExpress } from "react-icons/si";
import star from "../assets/star-irreg.svg"

export const SkillSection = () => {
    return (
        <>
        <section id="skills" className="skills">
            <div className="skill-title flex align-middle">
            <img src={star} className="h-15 bg-blue-700 lg:h-36" />            
            <h1 className="header p-10 h-1/2 m-auto">Skills and technologies</h1>
            <img src={star} className="h-15 bg-blue-700 lg:h-36" />            
            </div>

            <div className="grid place-items-center">
            <div className="skill-text grid grid-cols-2 gap-16 content-stretch lg:grid-cols-3 lg:gap-60">
                <p className="skill-items"><BiLogoJavascript size="3em" /> Javascript</p>
                <p className="skill-items"><BiLogoTypescript size="3em" /> Typescript</p>
                <p className="skill-items"><BiLogoHtml5 size="3em" /> HTML</p>
                <p className="skill-items"><BiLogoCss3 size="3em" /> CSS</p>
                <p className="skill-items"><BiLogoMongodb size="3em" /> MongoDB</p>
                <p className="skill-items"><SiExpress size="3em" /> ExpressJS</p>
                <p className="skill-items"><BiLogoReact size="3em" /> React</p>
                <p className="skill-items"><BiLogoNodejs size="3em" /> NodeJs</p>
            </div>
            </div>


            <h2 className="text-3xl font-bold m-6 text-center">Technical skills</h2>                
            <div className="grid place-items-center ">
            <div className="skill-text grid grid-cols-2 gap-16">
                <p className="skill-items"><BiBadgeCheck size="3em" /> Unit testing</p>
                <p className="skill-items"><BiBugAlt size="3em"/> Debugging</p>
            </div>
            </div>

            <h2 className="text-3xl font-bold m-6 text-center">Other software</h2>
            <div className="grid place-items-center">
            <div className="skill-text grid grid-cols-2 gap-16">
                <p className="skill-items"><BiLogoFigma size="3em" />Figma</p>
                <p className="skill-items"><SiCanva size="3em" />Canva</p>
                <p className="skill-items text-center"><BiLogoMicrosoft size="3em" />Microsoft Office Suite</p>
                <p className="skill-items"><SiPostman size="3em" />Postman</p>
            </div>
            </div>
        </section>
        </>
    );
};
