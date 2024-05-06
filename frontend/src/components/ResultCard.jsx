import React from "react";

function ResultCard({gameDetails,results,points}) {
  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <img
        src={gameDetails.bannerImg}
        alt={gameDetails.name}
        className="max-sm:w-48 w-62 "
      />
      <div className="flex flex-col gap-2 text-2xl font-normal">
        <span>Correct guess : {results[0]} </span>
        <span>One off guess : {results[1]}</span>
        <span>Wrong guess : {results[2]}</span>
      </div>
      <span className="text-2xl font-semibold">Total Points: {points}</span>
    </div>
  );
}

export default ResultCard;
