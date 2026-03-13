import { useState } from "react";
import { useNavigate } from "react-router";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const registerEndpoint = "http://localhost:9876/api/auth/register";

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(registerEndpoint,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"},
          body: JSON.stringify(formData)            
        },
      );

      const data = await response.json();
      //delete later
      console.log("register", data)

      if (response.ok) {
        navigate("/profile", {replace: true})
      }
    } catch (error) {
      console.log("error:", error)
    };
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='formItem'>
          <label>Name:</label>
          <input name="name" onChange={handleChange} />

          <label>Username:</label>
          <input name="username" onChange={handleChange} />

          <label>Email:</label>
          <input name="email" onChange={handleChange} />          

          <label>Password:</label>
          <input name="password" type="password" onChange={handleChange} />
          
          </div>

        <button className='button-style' type-="submit">Register</button>
      </form>
    </>
  );
};
