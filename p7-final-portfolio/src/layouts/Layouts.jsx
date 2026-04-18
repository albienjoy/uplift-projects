import { Link, Outlet } from "react-router";
export const Layouts = () => {
///// what is this for again

    return (
        <>
        <nav>
            <Link to="/">About me</Link>
            <Link to="/about">My journey</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
        </nav>
        
        </>
    );
};
