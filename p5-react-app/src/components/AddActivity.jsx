import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import background from "../assets/register.png";

export const AddActivity = () => {
  const notifySuccess = () => toast.success("Activity uploaded successfully!");
  const uploadEndpoint = import.meta.env.VITE_API_URL + "/api/post";
  const [date, setDate] = useState(new Date());

  const activityTypeOptions = [
    { value: "walk", label: "Walk" },
    { value: "run", label: "Run" },
    { value: "trailRun", label: "Trail run" },
    { value: "hike", label: "Hike" },
  ];

  const [formData, setFormData] = useState({
    activityName: "",
    activityType: "",
    description: "",
    distance: "",
    gear: "",
    totalTime: "",
    elevGain: "",
  });

  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formPayload = new FormData();

      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });

      formPayload.append("date", date);

      files.forEach((file) => {
        formPayload.append("files", file);
      });

      const response = await fetch(uploadEndpoint, {
        method: "POST",
        credentials: "include",
        body: formPayload,
      });

      const data = await response.json();

      const id = data.id;

      if (response.ok) {
        notifySuccess();
        navigate("/profile");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <h1 className='heading-style m-5 pl-5'> New activity </h1>

      <form onSubmit={handleSubmit} className='px-10 grid grid-cols-[1/3_1/3]'>
        <label className='font-bold text-md'>Activity name:</label>
        <input
          name='activityName'
          placeholder='Activity name'
          onChange={handleChange}
          required
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Activity type:</label>
        <select
          name='activityType'
          value={formData.activityType}
          onChange={handleChange}
          required
          className='input-style bg-lime-50/50 w-2/3'
        >
          <option value=''>Select activity</option>
          {activityTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label className='font-bold text-md'>Date:</label>
        <DatePicker
          maxDate={new Date()}
          name='date'
          selected={date}
          onChange={(date) => setDate(date)}
          required
          className='input-style bg-lime-50/50'
          portalId='react-datepicker-portal'
        />

        <label className='font-bold text-md'>Distance:</label>
        <input
          name='distance'
          placeholder='Distance'
          onChange={handleChange}
          required
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Elevation gain:</label>
        <input
          name='elevGain'
          placeholder='In meters'
          onChange={handleChange}
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Total time:</label>
        <input
          name='totalTime'
          placeholder='Total time'
          onChange={handleChange}
          required
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Gear:</label>
        <input
          name='gear'
          placeholder='Shoes'
          onChange={handleChange}
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Description:</label>
        <textarea
          name='description'
          onChange={handleChange}
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Upload photos:</label>
        <input
          type='file'
          multiple
          onChange={handleFileChange}
          className='ml-3 p-5 bg-lime rounded-2xl shadow-inner w-2/3'
        />

        <button type='submit' className='button-style my-5'>
          Add
        </button>
      </form>
    </>
  );
};
