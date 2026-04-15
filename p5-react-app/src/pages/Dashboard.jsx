import { ActivityCount } from "../components/ActivityCount";
import { ActivityList } from "../components/ActivityList";
import { Charts } from "../components/Charts";
import { useAuth } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";

export const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error } = useFetch(import.meta.env.VITE_API_URL + "/api/post");

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

  return (
    <>
      <div>
        <ActivityCount />
      </div>

      <div className='mb-20 bg-lime-100/50 w-full h-140'>
        <div className='w-9/10 m-auto pt-10'>
          <Charts />
        </div>
      </div>

      <div className='m-5'>
        <ActivityList />
      </div>
    </>
  );
};
