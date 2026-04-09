import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export const EditActivity = () => {
  const notifySuccess = () => toast.success("Activity uploaded successfully!");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const endpoint = "http://localhost:9876/api/post/" + id;

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
    const option = activityTypeOptions.find((item) => item.value === value);
    return option ? option.label : value;
  };

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

      const id = data.id;

      if (response.ok) {
        navigate(`/profile`);
        notifySuccess();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchOriginalData = async () => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError("Error loading data");
      }
    };

    fetchOriginalData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h1 className='heading-style m-5 pl-5'> Edit activity </h1>
      <form onSubmit={handleSubmit} className='px-10 grid grid-cols-[1/3_1/3]'>
        <label className='font-bold text-md'>Activity name:</label>
        <input
          name='activityName'
          placeholder='Activity name'
          onChange={handleChange}
          defaultValue={data.activityName}
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Activity type:</label>
        <select
          name='activityType'
          value={formData.activityType}
          onChange={handleChange}
          defaultValue={getActivityLabel(data.activityType)}
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
        <input
          name='date'
          placeholder='Date'
          onChange={handleChange}
          defaultValue={data.date}
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Distance:</label>
        <input
          name='distance'
          placeholder='Distance'
          onChange={handleChange}
          defaultValue={data.activityType}
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Total time:</label>
        <input
          name='totalTime'
          placeholder='Total time'
          onChange={handleChange}
          defaultValue={data.totalTime}
          className='input-style bg-lime-50/50 w-2/3'
        />

        <label className='font-bold text-md'>Description:</label>
        <textarea
          name='description'
          onChange={handleChange}
          defaultValue={data.description}
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
          Update
        </button>

        <hr />
      </form>
    </>
  );
};
