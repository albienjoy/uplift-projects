import { useFetch } from "../hooks/useFetch";
import statIcon from "../assets/stats.png";
import bestIcon from "../assets/best.png";

export const ActivityCount = () => {
  const { data, loading, error } = useFetch(import.meta.env.VITE_API_URL + "/api/post");

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

  const currentDate = new Date();
  const lastWeek = currentDate.setDate(currentDate.getDate() - 7);
  const lastWeekIso = new Date(lastWeek).toISOString().split("T")[0];
  const chartData = data.filter((item) => item.date >= lastWeekIso);

  const stats = chartData.reduce(
    (acc, activity) => {
      const type = activity.activityType;

      acc.count[type] = (acc.count[type] || 0) + 1;
      acc.distance[type] =
        (acc.distance[type] || 0) + Number(activity.distance);

      return acc;
    },
    { count: {}, distance: {} },
  );

  return (
    <>
      <div className='grid grid-cols-3 w-full m-3'>
        <div>
          <div className='heading-style'>
            {" "}
            <img src={statIcon} className='w-10 mr-2' /> Weekly stats
          </div>
          <p className='subheading-style'>Activity count</p>
          <p>
            <b>Run:</b> {stats.count.run}{" "}
          </p>
          <p>
            <b>Hike:</b> {stats.count.hike}{" "}
          </p>
          <p>
            <b>Trail run:</b> {stats.count.trailRun}{" "}
          </p>
          <p>
            <b>Walk:</b> {stats.count.walk}{" "}
          </p>
        </div>

        <div className='pt-18'>
          <p className='subheading-style'>Mileage</p>
          <p>
            <b>Run:</b> {stats.distance.run}km{" "}
          </p>
          <p>
            <b>Hike:</b> {stats.distance.hike}km{" "}
          </p>
          <p>
            <b>Trail run:</b> {stats.distance.trailRun}km{" "}
          </p>
          <p>
            <b>Walk:</b> {stats.distance.walk}km{" "}
          </p>
        </div>

        <div>
          <div className='heading-style'>
            <img src={bestIcon} className='w-10 mr-2' />
            Personal bests
          </div>
          <p>
            <b>5k:</b> 29:52:09
          </p>
          <p>
            <b>10k:</b> 1:04:56
          </p>
          <p>
            <b>21k:</b> 29:52
          </p>
        </div>
      </div>
    </>
  );
};
