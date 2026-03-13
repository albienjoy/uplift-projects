import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

export const ActivityDetails = () => {
  //this page should display the activity based on the param in the URL
  //this should use the read endpoint

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
  //note: optimize -- usecontext or usereducer

    const readEndpoint = ("http://localhost:9876/api/post/" + id);
    const activityTypeOptions = [
      {value: "walk", label: "Walk"},
      {value: "run", label: "Run"},
      {value: "trailRun", label: "Trail run"},
      {value: "hike", label: "Hike"}
    ];
    const getActivityLabel = (value) => {
      const option = activityTypeOptions.find(
          (item) => item.value === value
      );
      return option ? option.label : value;
    }

  useEffect(() => {
    const fetchOriginalData = async () => {
    try{
      const response = await fetch(readEndpoint, {
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
      Activity Details
      <div>
        <div>{data.activityName}</div>
        <div>{getActivityLabel(data.activityType)}</div>
        <div>{data.date}</div>        
        <div>{data.distance} kms</div>
        <div>{data.gear}</div>
        <div>{data.elevGain}</div>
        <div>{data.files?.map((file) => (
  <img key={file._id} src={file.url} alt="activity"/>
))}</div>
        <Link to={`/edit/${data._id}`}>
        <button>Edit</button>
        </Link>

      </div>

    </>
  );
};
