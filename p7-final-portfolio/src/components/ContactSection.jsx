import { FaGithub, FaLinkedin } from "react-icons/fa";

export const ContactSection = () => {
//links
const linkedInURL = "https://www.linkedin.com/in/albien-joy-sison-8ba94a92"
const githubURL = "https://github.com/albienjoy";

    return (
        <>
        <section id="contact">
        <div>
            <a href={linkedInURL} target="_blank"><FaLinkedin /></a>
            <a href={githubURL} target="_blank"><FaGithub /></a>
        </div>
        </section>
        </>
    );
};
