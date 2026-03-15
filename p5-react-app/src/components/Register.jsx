import { useState } from "react";
import { useNavigate } from "react-router";
import registerphoto from "../assets/register.png";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const registerEndpoint = "http://localhost:9876/api/auth/register";

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(registerEndpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
    <div className="relative w-full h-screen m-auto">
      <img src={registerphoto} className="w-full h-full overflow-hidden object-cover" />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500/10 backdrop-blur-xs w-140 m-auto border-2 border-lime rounded-4xl p-5 ml-5'>
        <form onSubmit={handleSubmit} className="m-auto p-6 text-lead ">
          <div className='grid grid-cols-[8em_1fr]'>
            <label className="font-bold mt-5">Name</label>
            <input name='name' type='text' onChange={handleChange} className="input-style bg-lime-50/50 w-75" />

            <label className="font-bold mt-5">Username</label>
            <input
              name='username'
              type='text'
              minlength='6'
              onChange={handleChange}
              className="input-style w-75 bg-lime-50/50"
/>

            <label className="font-bold mt-5">Email</label>
            <input
              name='email'
              type='text'
              pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
              onChange={handleChange}
              className="input-style w-75 bg-lime-50/50"

/>

            <label className="font-bold mt-5">Password</label>
            <input
              name='password'
              type='password'
              minLength='8'
              onChange={handleChange}
             className="input-style w-75 bg-lime-50/50"

 />
          </div>

          <button className='button-style flex m-auto mt-5 justify-center w-50' type-='submit'>
            Register
          </button>
        </form>
      </div>
      </div>
    </>
  );
};
