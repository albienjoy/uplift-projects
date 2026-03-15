import { ActivityCount } from "../components/ActivityCount";
import { ActivityList } from "../components/ActivityList";
import { Charts } from "../components/Charts";
import { useAuth } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";

export const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error } = useFetch("http://localhost:9876/api/post");
  if (!user) {
    return <div>You don't have enough access. Please log in</div>;
  }

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }


  return (
    <>
    <div className="grid grid-cols-2">
      <div className="fixed h-full w-full top-0 left-6/8 bg-silver pt-20 z-9">
        <ActivityCount />
      </div>
    </div>

    <div className="w-5/7">
      <div className="m-5 mb-20 bg-lime-100/50 w-full h-140">
        <div className="w-9/10 m-auto pt-10">
          <Charts />
        </div>
      </div>

      <div className="m-5">
      <ActivityList />
      </div>
    </div>


      
    </>
  );
};
