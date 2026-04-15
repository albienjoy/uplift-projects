/*
As a user, I can learn about your skills. (10 points)
Acceptance criteria
I can click a link to view/download your updated resume.
I can see a list of technologies and stacks that you use. 
Each technology and stack should be represented by an image icon/logo with an alt text.
 */

export const SkillSection = () => {
    return (
        <>
        <section>
            <div>
                Languages
                <p>Javascript</p>
                <p>Typescript</p>
            </div>

            <div>
                Stack
                <p>MongoDB</p>
                <p>ExpressJS</p>
                <p>React</p>
                <p>NodeJs</p>
            </div>

            <div>
                Technical skills
                <p>Unit testing using Jest</p>
                <p>Debugging</p>
            </div>


        </section>
        </>
    );
};
