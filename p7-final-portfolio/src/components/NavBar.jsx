import { useState } from "react";
import { BsList, BsChevronDoubleUp } from "react-icons/bs";
import Logo from "../assets/logo.svg";

export const NavBar = () => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <div>
        <header className='flex bg-slate-50 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-lg'>
            <a href='#' className='flex items-center'>
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                <img src={Logo} className="w-1/3" />
              </span> 
            </a>
          </div>

          <div
            className={`flex-col md:flex md:flex-row items-center w-full md:w-auto md:order-2 transition-all duration-300 ${nav ? "absolute top-14 left-0 w-full bg-white shadow-md p-4 md:relative md:top-0 md:w-auto md:bg-transparent md:shadow-none" : "hidden md:flex gap-6"}`}
          >
            <ul className='flex flex-col md:flex-row md:gap-8 gap-0'>
              <li>
                <a href='about-me' className='navbar-links'>
                  About me
                </a>
              </li>
              <li>
                <a href='projects' className='navbar-links'>
                  Projects
                </a>
              </li>
              <li>
                <a href='skills' className='navbar-links'>
                  Skills
                </a>
              </li>
              <li>
                <a href='contact' className='navbar-links'>
                  Contact me
                </a>
              </li>
            </ul>
          </div>

          <div className='md:hidden flex items-center lg:order-1'>
            <button
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none'
              aria-controls='mobile-menu'
              aria-expanded={nav}
              onClick={() => setNav(!nav)}
            >
              {nav ? <BsChevronDoubleUp /> : <BsList />}
            </button>
          </div>
        </header>
      </div>
    </>
  );
};
