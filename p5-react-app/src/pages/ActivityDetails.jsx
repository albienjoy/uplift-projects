import { useParams } from "react-router";
import { Link } from "react-router";
import { activityTypeOptions } from "../constants/activityTypes";
import { useFetch } from "../hooks/useFetch";

export const ActivityDetails = () => {
  const { id } = useParams();
  const getActivityLabel = (value) => {
    const option = activityTypeOptions.find((item) => item.value === value);
    return option ? option.label : value;
  };

  const { data, error } = useFetch(import.meta.env.VITE_API_URL + "/api/post/" + id);
  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className='flex justify-end m-2'>
        <Link to={`/edit/${data._id}`}>
          <button className='border-2 border-lime rounded-sm p-1 px-2'>
            Edit
          </button>
        </Link>
      </div>

      <div className='ml-6'>
        <div className='heading-style'>{data.activityName}</div>
        <div className='bg-lime w-20 text-center my-1'>
          {getActivityLabel(data.activityType)}
        </div>
        <div>
          {new Date(data.date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
        <div>{data.distance} kms</div>
        <div>{data.gear}</div>
        <div>{data.elevGain}</div>
        <div className='w-5/6 overflow-hidden object-cover rounded-2xl'>
          {data.files?.map((file) => (
            <img key={file._id} src={file.url} alt='activity' />
          ))}
        </div>
      </div>
    </>
  );
};
