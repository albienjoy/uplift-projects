import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export const EditActivity = () => {
  const notifySuccess = () => toast.success("Activity uploaded successfully!");  
  const {id} = useParams()  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

const endpoint = "http://localhost:9876/api/post/" + id;
console.log(endpoint)
  const activityTypeOptions = [
    { value: "walk", label: "Walk" },
    { value: "run", label: "Run" },
    { value: "trailRun", label: "Trail run" },
    { value: "hike", label: "Hike" },
  ];


  const [formData, setFormData] = useState({
    activityName: "",
    activityType: "",
    date: "",
    description: "",
    distance: "",
    gear: "",
    totalTime: "",
    elevGain: "",
  });

    const getActivityLabel = (value) => {
    const option = activityTypeOptions.find(
        (item) => item.value === value
    );
    return option ? option.label : value;
  }

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

      files.forEach((file) => {
        formPayload.append("files", file);
      });

      const response = await fetch(endpoint, {
        method: "PUT",
        credentials: "include",
        body: formPayload,
      });

      const data = await response.json();
console.log(data);
      const id = data.id;

      if (response.ok) {
        navigate(`/profile`);
        notifySuccess();
        console.log("success!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

useEffect(() => {
    const fetchOriginalData = async () => {
    try{
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setData(result);
      console.log(typeof result)

    }catch(error){
      setError("Error loading data")
    };
    }

    fetchOriginalData();

}, []);


  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <h1> Edit activity </h1>
      <form onSubmit={handleSubmit}>
        <label>Activity name:</label>
        <input
          name='activityName'
          placeholder='Activity name'
          onChange={handleChange}
          defaultValue={data.activityName}
        />

        <label>Activity type:</label>
        <select
          name='activityType'
          value={formData.activityType}
          onChange={handleChange}
          defaultValue={getActivityLabel(data.activityType)}
        >
          <option value=''>Select activity</option>
          {activityTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label>Date:</label>
        <input name='date' placeholder='Date' onChange={handleChange} defaultValue={data.date} />

        <label>Distance:</label>
        <input name='distance' placeholder='Distance' onChange={handleChange} defaultValue={data.activityType} />

        <label>Total time:</label>
        <input
          name='totalTime'
          placeholder='Total time'
          onChange={handleChange}
          defaultValue={data.totalTime}
        />

        <label>Description:</label>
        <textarea name='description' onChange={handleChange} defaultValue={data.description} />

        <label>Upload photos:</label>
        <input type='file' multiple onChange={handleFileChange} />

        <button type='submit'>Update</button>

        <hr />
      </form>
    </>
  );
};
