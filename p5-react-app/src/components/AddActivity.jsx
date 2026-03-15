import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import background from "../assets/register.png";

export const AddActivity = () => {
  const notifySuccess = () => toast.success("Activity uploaded successfully!");
  const uploadEndpoint = "http://localhost:9876/api/post";
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
        navigate("/profile")
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
    <div className="relative w-full h-screen m-auto">
      <img src={background} className="w-full h-full overflow-hidden object-cover" />

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-slate-100/30 backdrop-blur-xs 
      w-200 m-auto border-2 border-lime 
      rounded-4xl p-5 ml-5'>
              <h1 className='heading-style m-5 pl-5'> New activity </h1>

        <form onSubmit={handleSubmit} className='px-10 grid grid-cols-[10em_1fr]'>
          <label className="py-5 font-bold text-md">Activity name:</label>
          <input
            name='activityName'
            placeholder='Activity name'
            onChange={handleChange}
            required
            className='input-style w-100 bg-lime-50/50'
          />

          <label className="py-5 font-bold text-md">Activity type:</label>
          <select
            name='activityType'
            value={formData.activityType}
            onChange={handleChange}
            required
            className='input-style w-100 bg-lime-50/50'
          >
            <option value=''>Select activity</option>
            {activityTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="py-5 font-bold text-md">Date:</label>
          <DatePicker
            maxDate={new Date()}
            name='date'
            selected={date}
            onChange={(date) => setDate(date)}
            required
            className='input-style w-100 bg-lime-50/50'
            portalId="react-datepicker-portal"
          />

          <label className="py-5 font-bold text-md">Distance:</label>
          <input
            name='distance'
            placeholder='Distance'
            onChange={handleChange}
            required
            className='input-style w-100 bg-lime-50/50'
          />

          <label className="py-5 font-bold text-md">Elevation gain:</label>
          <input
            name='elevGain'
            placeholder='In meters'
            onChange={handleChange}
            className='input-style w-100 bg-lime-50/50'
          />

          <label className="py-5 font-bold text-md">Total time:</label>
          <input
            name='totalTime'
            placeholder='Total time'
            onChange={handleChange}
            required
            className='input-style w-100 bg-lime-50/50'
          />

          <label className="py-5 font-bold text-md">Gear:</label>
          <input
            name='gear'
            placeholder='Shoes'
            onChange={handleChange}
            className='input-style w-100 bg-lime-50/50'
          />

          <label className="py-5 font-bold text-md">Description:</label>
          <textarea
            name='description'
            onChange={handleChange}
            className='input-style w-100 bg-lime-50/50'
          />

          <label className="py-5 font-bold text-md">Upload photos:</label>
          <input
            type='file'
            multiple
            onChange={handleFileChange}
            className='ml-3 p-5 bg-lime w-95 rounded-2xl shadow-inner'
          />

          <button type='submit' className='button-style w-150 my-5'>
            Add
          </button>
        </form>
      </div>
    </div>
    </>
  );
};
