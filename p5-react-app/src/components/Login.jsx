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
      <h1> Login form </h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type='text'
          name="username"
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type='password'
          name='password'
          onChange={handleChange}
        />

        <button>Enter</button>
      </form>
    </div>
  );
};
