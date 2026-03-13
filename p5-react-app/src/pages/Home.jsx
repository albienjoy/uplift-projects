import {Link} from "react-router";


export const Home = () => {
    return (
        <>
        <div>Home</div>
        <Link to="/login">
        <button>Log in</button>
        </Link>
        <div></div>
        </>
    );

};
