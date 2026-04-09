import { Link } from "react-router";
import homephoto from "../assets/home.png";
import { Login } from "../components/Login";

export const Home = () => {
  return (
    <>
      <div className='relative w-full h-screen m-auto'>
        <img
          src={homephoto}
          className='w-full h-full overflow-hidden object-cover'
        />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Login />
          <div className='text-lightviolet text-center'>
            New here?
            <Link to='/register'>
              {" "}
              <b className='text-lime'>Register.</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
