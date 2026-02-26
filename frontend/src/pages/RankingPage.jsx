import { useEffect, useState } from "react";
import RankingCard from "../components/RankingCard";

function RankingPage() {
  const [ranking, setRanking] = useState([]);     // ranking array

  useEffect(() => {   // call fetchranking once wesbite load
    const fetchRanking = async () => {        // request get from ranking api (backend)
      try {
        const response = await fetch("http://localhost:3000/api/ranking");

        const data = await response.json();
        setRanking(data);       // store data in ranking array
      } catch (error) {
        console.error("Error fetching ranking:", error);
      }
    };

    fetchRanking();
  }, []);     // return empty array if get request has no value

  return (
    <div className="flex flex-col h-screen justify-start items-center bg-gray-100">
      <h1 className="text-6xl font-bold my-15">Ranking Page</h1>
      <div className="w-[600px] bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Final Ranking</h2>

        {ranking.length === 0 ? (       // display no data if ranking array has no value
          <p className="text-center text-gray-500">
            No ranking data available.
          </p>
        ) : (
          ranking.map((contestant, index) => (    // loop through ranking array to display the get values
            <RankingCard                    // pass get values to ranking card props
              key={contestant.id}
              contestant={contestant}
              position={index + 1}
            />
          ))
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => (window.location.href = "/")}    // redirect to home page
            className="bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Back to Score Table
          </button>
        </div>
      </div>
    </div>
  );
}

export default RankingPage;
