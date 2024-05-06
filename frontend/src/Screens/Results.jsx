import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../constants";

import ResultCard from "../components/ResultCard";
import { FaClipboard } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

function Results() {
  const location = useLocation();
  
 
  const { results, gameId, points, shortId } = location.state;
  const [gameDetails, setGameDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied,setCopied] = useState(false)
  const getGameById = async (gameId) => {
    try {
      const res = await axios.get(`${BASE_URL}games/banner/${gameId}`);
      setGameDetails(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const updateResults = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}results`, reqBody);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (gameId) {
      setIsLoading(true);
      getGameById(gameId);
    }
  }, [gameId]);

  

  useEffect(() => {
    if (shortId && gameDetails.name && gameDetails.bannerImg) {
      const reqBody = {
        shortId: shortId,
        gameDetails: {
          bannerImg: gameDetails.bannerImg,
          name: gameDetails.name,
        },
        points,
        results,
      };
      updateResults(reqBody);
    }
  }, [shortId, gameDetails]);

  return (
    <div className="w-full relative bg-[#141414] min-h-[100vh] pb-10 flex flex-col  items-center pt-10 gap-20 text-white font-Mont">
      {!isLoading && (
        <>
          <ResultCard
            points={points}
            gameDetails={gameDetails}
            results={results}
          />
        </>
      )}
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-lg font-semibold ">Share with your friends!</h1>
        <div className="flex items-center p-2 bg-white gap-2 rounded">
          <input
            type="text "
            className="text-black font-semibold border-2 border-black rounded p-2"
            value={` https://whatsmyrank.onrender.com/results/${shortId}`}
            readOnly
          />
          <FaClipboard
            className="w-6 text-black bg-white h-full cursor-pointer outline-none border-none"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://whatsmyrank.onrender.com/results/${shortId}`
              );
              setCopied(true)
            }}
            data-tooltip-id={`copyLink`}
            data-tooltip-content={copied?'Copied!':'Copy!'}
          />
          <Tooltip id={`copyLink`} place="bottom" className="font-bold" />
        </div>
      </div>
    </div>
  );
}

export default Results;
