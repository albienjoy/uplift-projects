import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {DatePicker} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
console.log(data.date);
      const id = data.id;

      if (response.ok) {
        navigate(`/profile/${id}`);
        notifySuccess();
        console.log("success!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <h1> New activity </h1>
      <form onSubmit={handleSubmit}>
        <label>Activity name:</label>
        <input
          name='activityName'
          placeholder='Activity name'
          onChange={handleChange}
        />

        <label>Activity type:</label>
        <select
          name='activityType'
          value={formData.activityType}
          onChange={handleChange}
        >
          <option value=''>Select activity</option>
          {activityTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <label>Date:</label>
        <DatePicker name='date' selected={date} onChange={(date) => setDate(date)} />

        <label>Distance:</label>
        <input name='distance' placeholder='Distance' onChange={handleChange} />
        
        <label>Total time:</label>
        <input
          name='totalTime'
          placeholder='Total time'
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea name='description' onChange={handleChange} />

        <label>Upload photos:</label>
        <input type='file' multiple onChange={handleFileChange} />

        <button type='submit'>Add Activity</button>
        {/* ddelete this  hr later */}
        <hr />
      </form>
    </>
  );
};
