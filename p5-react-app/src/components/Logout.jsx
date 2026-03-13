//this has the logout button
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const Logout = () => {
  const logoutEndpoint = "http://localhost:9876/api/auth/logout";
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
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};
