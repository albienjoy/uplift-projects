import { useNavigate } from "react-router";
import logoutIcon from "../assets/logout.png";

export const Logout = () => {
  const logoutEndpoint = import.meta.env.VITE_API_URL + "/api/auth/logout";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(logoutEndpoint, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      }

      console.log("logged out successfully");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <>
      <button className='flex text-silver sm:text-xs' onClick={handleLogout}>
        Log out
      </button>
    </>
  );
};
