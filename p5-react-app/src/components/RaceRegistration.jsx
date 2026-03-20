import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import marathonimg from "../assets/marathon1.png";

export const RaceRegistration = () => {
  const notifySuccess = () => toast.success("Successfully registered!");
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    "http://localhost:9876/api/race" + "/" + id,
  );

  const registrationEndpoint = "http://localhost:9876/api/race/register";

  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    email: "",
    contactNumber: "",
    address: "",
    shirtSize: "",
    emergencyContactPerson: "",
    emergencyContactNumber: "",
  });

  const [birthday, setBirthday] = useState(new Date());

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...formData,
        birthday,
      };

      const response = await fetch(registrationEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        notifySuccess();
        console.log(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <div className='gap-6 p-5 border-2 border-lime rounded-2xl m-5'>
        <img
          src={marathonimg}
          className='w-full h-1/3 object-cover rounded-xl'
        />
        <div className='flex flex-col gap-2 text-md px-6 sm:text-sm'>
          <div className='font-bold text-2xl text-darkviolet p-4 sm:text-sm'>
            {data.marathon.name.en}
          </div>
          <div>
            {" "}
            <b>City:</b> {data.marathon.city}
          </div>
          <div>
            {" "}
            <b>Course type:</b> {data.marathon.course.type}
          </div>
          <div>
            {" "}
            <b>Elevation gain: </b>
            {data.marathon.course.elevationGain}m
          </div>
          <div>
            {" "}
            <b>Profile:</b> {data.marathon.course.profile}
          </div>
          <div>
            {" "}
            <b>Terrain:</b> {data.marathon.course.terrain}
          </div>
        </div>
      </div>

      <div className='border-2 border-lightviolet p-5 rounded-2xl m-5'>
        <h1 className='font-bold text-2xl text-darkviolet p-4 sm:text-sm'>
          Registration
        </h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 text-md'>
          <label className='m-5'>Name: </label>
          <input
            name='name'
            placeholder='Full name'
            onChange={handleChange}
            required
            className='input-style'
          />

          <label className='m-5'>Birthday:</label>
          <DatePicker
            maxDate={new Date()}
            name='birthday'
            selected={birthday}
            onChange={(birthday) => setBirthday(birthday)}
            required
            className='input-style w-6/7'
            portalId='react-datepicker-portal'
          />

          <label className='m-5'>Sex (Male/Female): </label>
          <input
            name='sex'
            placeholder='Male/Female'
            onChange={handleChange}
            required
            className='input-style'
          />

          <label className='m-5'>Email: </label>
          <input
            name='email'
            placeholder='Email'
            onChange={handleChange}
            type='text'
            pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
            required
            className='input-style'
          />

          <label className='m-5'>Contact number: </label>
          <input
            name='contactNumber'
            type='text'
            pattern='\d*'
            minLength='11'
            maxLength='11'
            placeholder='09xxxxxxxxx'
            onChange={handleChange}
            required
            className='input-style'
          />

          <label className='m-5'>Address: </label>
          <input
            name='address'
            placeholder='House no., Brgy, City, Province'
            onChange={handleChange}
            className='input-style'
          />

          <label className='m-5'>Shirt size: </label>
          <input
            name='shirtSize'
            placeholder='See race site for details'
            onChange={handleChange}
            required
            className='input-style'
          />

          <label className='m-5'>Emergency contact person: </label>
          <input
            name='emergencyContactPerson'
            placeholder='Full name'
            onChange={handleChange}
            required
            className='input-style'
          />

          <label className='m-5'>Contact number: </label>
          <input
            name='emergencyContactNumber'
            type='text'
            pattern='\d*'
            minLength='11'
            maxLength='11'
            placeholder='09xxxxxxxxx'
            onChange={handleChange}
            required
            className='input-style'
          />
          <div className='col-span-2 m-auto'>
            <button type='submit' className='button-style m-5'>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
