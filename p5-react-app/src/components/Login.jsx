import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Login = () => {
  const notifySuccess = () => toast.success("Logged in successfully!");
  const loginEndpoint = "http://localhost:9876/api/auth/login";
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
    
      if (response.ok){
        notifySuccess();
        navigate("/profile", {replace: true})
      };

    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 bg-slate-500/10 backdrop-blur-xs w-80 m-auto border-2 border-lime rounded-4xl p-5">
      <form onSubmit={handleSubmit} className="m-auto">
        <p className="text-xl m-3 font-bold">Log in</p>
        <label className="ml-3 font-bold">Username</label>
        <input
          type='text'
          name="username"
          onChange={handleChange}
          className="input-style w-60 bg-lime-50/50"
        />

        <label className="ml-3 font-bold">Password</label>
        <input
          type='password'
          name='password'
          onChange={handleChange}
          className="input-style w-60 bg-lime-50/50"
        />

        <button className="button-style flex m-auto mt-5 justify-center ">Enter</button>
      </form>
      </div>
    </div>
  );
};
