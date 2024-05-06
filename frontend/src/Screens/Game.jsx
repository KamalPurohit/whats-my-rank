import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CiLock } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../constants";
import { nanoid } from "nanoid";

function Game() {
  const [gameDetails, setGameDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [randomClips, setRandomClips] = useState([]);
  const location = useLocation();
  const gameId = location.state?.gameId;
  const [clipNo, setClipNo] = useState(0);
  const [clipId, setClipId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [guessedRank, setGuessedRank] = useState(0);
  const [showRules, setShowRules] = useState(true);
  // results[noOFguessedRight,oneOff,wrong]
  const results = useRef([0, 0, 0]);
  const navigate = useNavigate();
  const getGameById = async (gameId) => {
    try {
      const res = await axios.get(`${BASE_URL}games/${gameId}`);
      setGameDetails(res.data.gameDoc);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getRandomClips = async (gameId) => {
    try {
      const res = await axios.get(`${BASE_URL}clips/${gameId}`);
      setRandomClips(res.data);
      setClipId(res.data[clipNo]?.clipId);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const checkAnswer = (rankGuessed) => {
    setGuessedRank(rankGuessed);
    if (rankGuessed == randomClips[clipNo].rank) {
      const current = results.current[0];
      results.current.splice(0, 1, current + 1);
      setPoints((prev) => prev + 100);
    } else if (
      rankGuessed == randomClips[clipNo].rank + 1 ||
      rankGuessed == randomClips[clipNo].rank - 1
    ) {
      results.current.splice(1, 1, results.current[1] + 1);
      setPoints((prev) => prev + 50);
    } else {
      results.current.splice(2, 1, results.current[2] + 1);
    }
    setShowModal(true);
  };


  const handleContinue = () => {
    if (clipNo < 2) {
      setClipId(randomClips[clipNo + 1].clipId);
      setClipNo((prev) => prev + 1);
      setShowModal(false);
    }
    if (clipNo === 2) {
      const shortId = nanoid(8)
      navigate("/results", {
        state: { points, results: results.current, gameId ,shortId},
      });
    }
  };

  useEffect(() => {
    if (gameId) {
      setIsLoading(true);
      getGameById(gameId);
      getRandomClips(gameId);
    }
  }, [gameId]);



  return (
    <>
      {showRules ? (
        <div className="w-full relative bg-[#141414] min-h-[100vh] pb-10 flex flex-col  items-center pt-10 gap-10 text-white font-Mont">
          <img src={gameDetails?.bannerImg} alt={gameDetails?.name} />
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-2xl">
              Play Whats My Rank for {gameDetails?.name}
            </span>
            <span className="text-2xl">Watch clips and Guess the Rank!</span>
            <span className="text-2xl">Correct Rank: +100 points</span>
            <span className="text-2xl">One Off Rank: +50 Points</span>
          </div>
          <button
            className="bg-[#3a3a3a] px-4 py-2 w-[150px] text-center text-lg font-semibold cursor-pointer"
            onClick={() => setShowRules(false)}
          >
            {" "}
            Play Game!
          </button>
        </div>
      ) : (
        <div
          className={`w-full relative bg-[#141414] min-h-[100vh] pb-10 flex flex-col  items-center pt-10 gap-20 text-white font-Mont`}
        >
          {showModal && (
            <div className="absolute top-0 h-[100%]  w-full bg-[#000000] bg-opacity-80	 fixed flex items-center justify-center flex-col">
              <div className="bg-[#141414] shadow-xl z-10 flex flex-col w-fit items-center gap-10 p-10 max-sm:w-[95%]">
                <h4 className="font-bold text-3xl ">Clip Result</h4>
                <div className="flex gap-10 text-lg font-semibold">
                  <div className="flex items-center text-center flex-col gap-4">
                    <span>Guessed Rank: </span>
                    <img
                      src={gameDetails.ranks[guessedRank - 1].rankLogo}
                      alt=""
                      className="w-20 max-sm:w-16"
                    />
                  </div>
                  <div className="flex items-center text-center flex-col gap-4">
                    <span>Correct Rank: </span>
                    <img
                      src={
                        gameDetails.ranks[randomClips[clipNo].rank - 1].rankLogo
                      }
                      alt=""
                      className="w-20 max-sm:w-16"
                    />
                  </div>

                  <div className="flex items-center text-center flex-col gap-4 h-full">
                    <span>Points Earned: </span>
                    <span className="text-3xl text-green-200 flex flex-col h-full items-center justify-center">
                      {randomClips[clipNo].rank == guessedRank
                        ? `+100`
                        : randomClips[clipNo].rank == guessedRank + 1 ||
                          randomClips[clipNo].rank == guessedRank - 1
                        ? `+50`
                        : `+0`}
                    </span>
                  </div>
                </div>
                <div className=" text-2xl font-semibold flex flex-col items-center  gap-2 text-center ">
                  <span>Total Points: </span>
                  <span className="text-2xl">{points}</span>
                </div>
                <button
                  className="bg-[#3a3a3a] px-4 py-2 w-[150px] text-center cursor-pointer"
                  onClick={() => handleContinue()}
                >
                  {" "}
                  Continue
                </button>
              </div>
            </div>
          )}

          {/*stepper*/}
          <div className="flex w-[70%] items-center gap-2 justify-center ">
            {Array(3)
              .fill("")
              .map((ok, idx) => {
                return (
                  <>
                    <div
                      className={`flex  rounded-full w-10 h-10 text-center justify-center items-center aspect-square font-semibold ${
                        idx <= clipNo ? `bg-blue-500` : `bg-gray-500`
                      } ${idx == clipNo && `bg-green-500`}`}
                      key={idx}
                    >
                      {idx <= clipNo ? idx + 1 : <CiLock />}
                    </div>
                    {idx != 2 && (
                      <div className="w-[20vw] border-green-200 border-2"></div>
                    )}
                  </>
                );
              })}
          </div>
          {/*youtube frame*/}

          {!isLoading && (
            <>
              <iframe
                className="w-[80%] max-w-[900px] aspect-video max-md:w-full "
                src={`https://www.youtube.com/embed/${clipId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-4 items-center justify-center flex-wrap">
                  {gameDetails?.ranks.map((rank, idx) => {
                    return (
                      <img
                        src={rank.rankLogo}
                        alt={rank.name}
                        key={idx}
                        className="w-20 h-20 cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                        onClick={() => checkAnswer(idx + 1)}
                      />
                    );
                  })}
                </div>

                <span className="text-4xl">Points: {points}</span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Game;
