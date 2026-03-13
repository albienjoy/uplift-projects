import { Link } from "react-router";
import { useEffect } from "react";
import { useState } from "react";


export const RaceList = () => {
  const listEndpoint = "http://localhost:9876/api/race";

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setData(result.active);
      console.log(result.active)

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


    return (
        <div>
            {data.map((race) => (
                <div key={race.id}>
                    <div>{race.name.en}</div>
                    <div>City: {race.city}</div>                                   
                    <div>{race.url}</div>                
                
                </div>
            ))}

        </div>
    );
};
