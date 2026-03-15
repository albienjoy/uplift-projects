import { useParams } from "react-router";
import { Link } from "react-router";
import {activityTypeOptions} from "../constants/activityTypes";
import { useFetch } from "../hooks/useFetch";
import { ActivityCount } from "../components/ActivityCount";

export const ActivityDetails = () => {
    const { id } = useParams();
    const getActivityLabel = (value) => {
      const option = activityTypeOptions.find(
          (item) => item.value === value
      );
      return option ? option.label : value;
    }

    const { data, error } = useFetch("http://localhost:9876/api/post/" + id);
  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div>
        <div className="m-6">
          <div className="heading-style">{data.activityName}</div>
          <div className="bg-lime w-20bg-lime w-20 text-center my-1">{getActivityLabel(data.activityType)}</div>
          <div>{new Date(data.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}</div>        
          <div>{data.distance} kms</div>
          <div>{data.gear}</div>
          <div>{data.elevGain}</div>
          <div className="w-2/3 h-5/6 overflow-hidden object-cover rounded-2xl">{data.files?.map((file) => (
              <img key={file._id} src={file.url} alt="activity"/>
            ))}</div>
          <Link to={`/edit/${data._id}`}>
          <button className="button-style">Edit</button>
          </Link>
        </div>
      </div>

    <div className="grid grid-cols-2">
      <div className="fixed h-full w-full top-0 left-6/8 bg-silver pt-20 z-9">
        <ActivityCount />
      </div>
    </div>
    </>
  );
};
