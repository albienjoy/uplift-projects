import {
  BarChart,
  ResponsiveContainer,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useFetch } from "../hooks/useFetch";

export const Charts = () => {
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

  const mileageData = [
    { name: "Run", distance: stats.distance.run },
    { name: "Hike", distance: stats.distance.hike },
    { name: "Trail run", distance: stats.distance.trailRun },
    { name: "Walk", distance: stats.distance.walk },
  ];

  return (
    <>
      <div className='w-full h-100'>
        <h1 className='heading-style p-5'>Weekly mileage</h1>
        <ResponsiveContainer
          width='100%'
          height='100%'
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            width={730}
            height={250}
            barSize={600}
            barGap={2}
            data={mileageData}
          >
            <XAxis dataKey='name' />
            <YAxis dataKey='distance' />
            <CartesianGrid strokeDasharray='5 5' stroke='#311e4e' />
            <Bar dataKey='distance' fill='#9a94de' />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
