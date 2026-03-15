import { Logout } from "./Logout";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router";
import logo from "../assets/push-logo.png";

export const NavBar = () => {
  const { user } = useAuth();

  let menuLinks;

  if (user) {
    menuLinks = (
        <div className="flex text-silver justify-between w-full font-quantico text-xl">

            <div>
            <Link to="/profile">
            <img src={logo} className="w-20 m-auto" />
            </Link>
            </div>
            <div className="flex justify-between w-1/3">
            <Link to="/profile/upload">Upload</Link>
            <Link to="/races/list">Races</Link>
            <Logout />
            </div>
        </div>
    );
  }else{
    menuLinks = (
            <div>
            <Link to="/">
            <img src={logo} className="w-40 m-auto" />
            </Link>
            </div>
            
            
    );
  };

    return (
        <>
        <div className="sticky flex space-between w-full bg-darkviolet p-5 z-10">
            {menuLinks}
        </div>
        </>

    );
};
