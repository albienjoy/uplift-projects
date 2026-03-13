import { Link } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

export const ActivityList = () => {

  const listEndpoint = "http://localhost:9876/api/post";

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const activityTypeOptions = [
    {value: "walk", label: "Walk"},
    {value: "run", label: "Run"},
    {value: "trailRun", label: "Trail run"},
    {value: "hike", label: "Hike"}
  ];

  useEffect(() => {
    
    const fetchData = async () => {
    try {
      const response = await fetch(listEndpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setData(result);

      if (response.ok) {
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
    
    fetchData()}, [])

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

  const getActivityLabel = (value) => {
    const option = activityTypeOptions.find(
        (item) => item.value === value
    );
    return option ? option.label : value;
  }

  return (
    <>
      <div>{data.map((activity) => (

        <div key={activity._id}>
        <h2>{activity.activityName}</h2>
        <div>{activity.date} kms</div>
        <div>{getActivityLabel(activity.activityType)}</div>
        <div>{activity.distance} kms</div>
        <div>{activity.gear}</div>
        <div>{activity.elevGain}</div>
        <div>{activity.files?.map((file) => (
  <img key={file._id} src={file.url} alt="activity"/>
))}</div>

        <Link to={`/profile/${activity._id}`}>
        <button>View</button>
        </Link>
        </div>
      ))}
      </div>
    </>
  );
};
