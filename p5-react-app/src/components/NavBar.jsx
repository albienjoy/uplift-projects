import { Logout } from "./Logout";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router";
import logo from "../assets/push-logo.png";

export const NavBar = () => {
  const { user } = useAuth();

  let menuLinks;

  if (user) {
    menuLinks = (
      <div className='grid grid-cols-[1fr_1/3] text-silver sm:text-xs w-full font-quantico text-xl'>
        <div className=''>
          <Link to='/profile'>
            <img src={logo} className='w-20 sm:w-20 m-auto' />
          </Link>
        </div>
        <div className='flex justify-between'>
          <Link to='/profile/upload'>Upload</Link>
          <Link to='/races/list'>Races</Link>
          <Logout />
        </div>
      </div>
    );
  } else {
    menuLinks = (
      <div>
        <Link to='/'>
          <img src={logo} className='w-40 m-auto' />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className='sticky flex space-between w-full bg-darkviolet p-5 z-10'>
        {menuLinks}
      </div>
    </>
  );
};
