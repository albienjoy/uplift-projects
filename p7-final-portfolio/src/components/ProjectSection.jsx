/*
As a user, I can learn information about you. (10 points)
Acceptance criteria
I can see your full name.
I can read a short description of you.
(Optional) I can see a photo of you.

As a user, I can see how to contact or follow you. (10 points)
Acceptance criteria
I can click a link to send an email to your email address.
I can click a link to visit your GitHub or Gitlab page.
I can click a link to visit your LinkedIn page.
 */
import keysprint from "../assets/keysprint.gif"

export const ProjectSection = () => {
        //links
        const keySprintLink = "https://key-sprint-t748.onrender.com"
        const tagpiLink = "https://key-sprint-t748.onrender.com";
        const pushLink = "https://projects-0xuz.onrender.com";

        //gitlab links

    return (
        <>
        <section id="projects">
            <h1 className="header">Projects</h1>
            <div className="grid grid-cols-1 m-8 gap-8">
            <div className="project-card">
                <h1 className="project-title">The First Language</h1>
                <p>This is a command line choose-your-own-adventure game that promotes reading and stimulates imagination!</p>
                <p>Javascript</p>
                <a>Link</a>
            </div>

            <div className="project-card">
                <h1>Key Sprint</h1>
                <img src={keysprint} />
                <p>This is a typing game featuring vanilla Javascript </p>
                <a href={keySprintLink} target="_blank" rel="noopener noreferrer">Live</a>
            </div>

            <div>
                <h1>Tagpi</h1>
                <p>Decluttering? Sick of a closet full of clothes you don't wear? Donate it and we'll repurpose it--for good! </p>
                <p>A full-stack app, with Node and Express for the backend and a simple html structure for the frontend</p>
                <a href={tagpiLink} target="_blank" rel="noopener noreferrer">Link</a>
            </div>

            <div>
                <h1>push</h1>
                <p>Strava, but better. This app features a race registration feature!</p>
                <a href={pushLink} target="_blank" rel="noopener noreferrer">Link</a>
            </div>

            <div>
                <h1>Lockatoo</h1>
                <p>Baggage counter in Metro Manila--the perfect temporary storage solution for travelers in the city!</p>
                <p>MongoDB</p>
                <p>Express</p>
                <p>React</p>
                <p>NodeJS</p>
                <p>Language: Javascript</p>
                <p>Libraries: Tailwind, Resend, Toastify, React-Datepicker, Cloudinary, Helmet, Cors</p>
            </div>
            </div>
        </section>
        </>

    );
};
