import { Link } from "react-router";
import { useEffect, useState } from "react";
import background from "../assets/background.png";

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
        console.log(result.active);

        if (response.ok) {
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error displaying data. </div>;
  }

  return (
    <div>
      <div>
      {data.map((race) => (
        <div key={race.id}  className="border-2 border-lime m-5 p-5 rounded-xl w-300">
          <div className="text-xl font-bold">{race.name.en}</div>
          <div> <b>City: </b>{race.city}</div>
          <div> <b>Date: </b>{new Date(race.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}</div>          
          <div>{race.url}</div>

          <Link to={`/races/register/${race.id}`}>
          <button className="button-style">Register</button>
          </Link>

        </div>
      ))}
      </div>
    </div>
  );
};
