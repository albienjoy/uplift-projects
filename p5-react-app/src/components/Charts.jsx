import {BarChart, ResponsiveContainer, Bar, Tooltip, XAxis, YAxis, CartesianGrid} from "recharts";
import { useState, useEffect } from "react";

export const Charts = () => {

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
    
    fetchData(), []})

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

const currentDate = new Date();
const lastWeek = currentDate.setDate(currentDate.getDate() - 7);
const lastWeekIso = new Date(lastWeek).toISOString().split('T')[0];
console.log("last week", lastWeekIso)
//last week's data (rolling)
const chartData = data.filter(item => item.date >= lastWeekIso)
console.log("chart data", chartData)

const runCount = chartData.filter(item => item.activityType === 'run')
const runTotal = runCount.reduce((sum, run) => sum + Number(run.distance), 0)

const hikeCount = chartData.filter(item => item.activityType === 'hike')
const hikeTotal = hikeCount.reduce((sum, hike) => sum + Number(hike.distance), 0)

const trailRunCount = chartData.filter(item => item.activityType === 'trailRun')
const trailRunTotal = trailRunCount.reduce((sum, trail) => sum + Number(trail.distance), 0)

const walkCount = chartData.filter(item => item.activityType === 'walk')
const walkTotal = walkCount.reduce((sum, walk) => sum + Number(walk.distance), 0)

const mileageData = [{name: "Run", distance: runTotal}, {name: "Hike", distance: hikeTotal}, 
  {name: "Trail run", distance: trailRunTotal}, {name: "Walk", distance: walkTotal}]

const runCounter = runCount.length
    return (
        <div style={{width: "100%", height:300}}>
            <h1>Weekly mileage</h1>
<ResponsiveContainer width="100%" height="100%">
            <BarChart 
            width={730}
            height={250}
            barSize={600}
            barGap={2}
            data={mileageData}>
            
            <XAxis dataKey="name" />
            <YAxis dataKey="distance" />
            <CartesianGrid strokeDasharray="5 5" />
            <Bar dataKey="distance" fill="#8884d8" />
            <Tooltip />

            </BarChart>
</ResponsiveContainer>
            <p>Total runs this week: {runCounter} </p>


        </div>
    );
};
