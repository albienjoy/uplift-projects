import { Link } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { activityTypeOptions } from "../constants/activityTypes";
import { useState, useEffect } from "react";

export const ActivityList = () => {
  const { data, loading, error } = useFetch("http://localhost:9876/api/post");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch("http://localhost:9876/api/post/" + id, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setActivities((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

  const getActivityLabel = (value) => {
    const option = activityTypeOptions.find((item) => item.value === value);
    return option ? option.label : value;
  };

  return (
    <>
      <div>
        {activities.map((activity) => (
          <div key={activity._id}>
            <div className='border-1 border-lime rounded-2xl p-4 pl-10 m-5'>
              <div className='heading-style'>{activity.activityName}</div>
              <div>
                <div className='bg-lime w-20 text-center my-1'>
                  {getActivityLabel(activity.activityType)}
                </div>
                <div>
                  {new Date(activity.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div>
                  <b>Distance: </b>
                  {activity.distance} kms
                </div>
                <div>{activity.gear}</div>
                <div>{activity.elevGain}</div>
                <div className='w-6/7 h-100 my-3 overflow-hidden rounded-lg'>
                  {activity.files?.map((file) => (
                    <img
                      key={file._id}
                      src={file.url}
                      alt='activity'
                      className='w-full h-full object-cover'
                    />
                  ))}
                </div>
              </div>

              <div className=''>
                <Link to={`/profile/${activity._id}`}>
                  <button className='button-style'>View</button>
                </Link>
                <button
                  className='button-style'
                  onClick={() => handleDelete(activity._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
