import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../constants";
import axios from "axios";
import ResultCard from "../components/ResultCard";

function ResultsById() {
  const { shortId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState({});
  const getResultById = async (shortId) => {
    try {
      const res = await axios.get(`${BASE_URL}results/${shortId}`);
      setResults(res.data);
      setIsLoading(false)
    } catch (err) {
      console.log(err);
    }
  };
  console.log(results);
  useEffect(() => {
    if (shortId) {
      setIsLoading(true);
      getResultById(shortId);
    }
  }, [shortId]);
  return (
    <div className="w-full relative bg-[#141414] min-h-[100vh] pb-10 flex flex-col  items-center pt-10 gap-20 text-white font-Mont">
      {!isLoading && (
        <ResultCard
          points={results.points}
          gameDetails={results.gameDetails}
          results={results.results}
        />
      )}
    </div>
  );
}

export default ResultsById;
