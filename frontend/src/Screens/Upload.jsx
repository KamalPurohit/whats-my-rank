import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../constants";
function Upload() {
  const [isUploadable, setIsUploadable] = useState(false);
  const [allGames, setAllGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [clipData, setClipData] = useState({
    rank: "",
    userName: "",
    clipUrl: "",
    clipId: "",
  });

  function extractYouTubeVideoCode(link) {
    // Regular expression to extract the video code
    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    var match;
    var videoCode;

    // Iterate through each parameter in the URL
    while ((match = regex.exec(link)) !== null) {
      // Check if the parameter is 'v' (for video code)
      if (match[1] === "v") {
        videoCode = match[2]; // Extract the video code
        break; // Exit the loop once found
      }
    }

    // If 'v' parameter is not found, try to extract from the path
    if (!videoCode) {
      // Regular expression to extract the video code from the path
      var pathRegex = /(?:\/|%3D|&|\?|^)([0-9A-Za-z_-]{11})(?:[&?%]|$)/;
      var pathMatch = pathRegex.exec(link);
      if (pathMatch !== null) {
        videoCode = pathMatch[1]; // Extract the video code
      }
    }

    return videoCode;
  }

  useEffect(() => {
    setClipData((prev) => {
      return { ...prev, clipId: extractYouTubeVideoCode(clipData.clipUrl) };
    });
  }, [clipData.clipUrl]);

  const getAllGames = async () => {
    try {
      const res = await axios.get(`${BASE_URL}games`);
      setAllGames(res.data.gameDoc);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(selectedGame, selectedGameId, clipData);

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setClipData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    getAllGames();
  }, []);

  useEffect(() => {
    if (!selectedGameId) setSelectedGame(null);
    if (selectedGameId) {
      setSelectedGame(() => {
        return allGames.filter((game) => {
          return game._id == selectedGameId;
        })[0];
      });
    }
  }, [selectedGameId]);

  const addNewClip = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}/clips`, reqBody);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (!selectedGameId) return toast.error("please select a game!");
    if (!clipData.userName) toast.error("Please Enter User Name!");
    if (!clipData.rank) toast.error("Please select a rank!");
    if (!clipData.clipUrl || !clipData.clipId)
      toast.error("Please Enter a valid Url!");
    else {
      const reqBody = {
        userName: clipData.userName,
        gameId: selectedGameId,
        rank: parseInt(clipData.rank),
        clipId: clipData.clipId,
        clipUrl: clipData.clipUrl,
      };
      addNewClip(reqBody);
    }
  };

  return (
    <div className='"w-full bg-[#141414] min-h-[100vh] pb-10 flex max-sm:flex-col justify-evenly  items-center pt-10 gap-20"'>
      <iframe
        width="350"
        height="200"
        className="w-[500px] h-[300px] max-md:w-[350px] max-sm:w-[300px] max-sm:h-[200px]"
        src={`https://www.youtube.com/embed/${clipData.clipId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <ToastContainer />

      <form className="flex flex-col text-white gap-2 items-center">
        <label className="self-start" htmlFor="game">
          Game *
        </label>
        <select
          name="game"
          id="game"
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
          className="bg-[#3a3a3a] px-4 py-2 w-[215.5px] flex gap-5 "
        >
          <option value="">Select a Game</option>
          {allGames.map((game) => {
            return <option value={game._id}>{game.name}</option>;
          })}
        </select>
        {selectedGame && (
          <>
            <label className="self-start" htmlFor="clipUrl">
              Youtube Link *
            </label>
            <input
              type="text"
              name="clipUrl"
              id="clipUrl"
              className="bg-[#3a3a3a]  px-4 py-2"
              placeholder="Enter video Link"
              onChange={handleFormChange}
            />
            <label className="self-start" htmlFor="clipUrl">
              Username *
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="bg-[#3a3a3a] px-4 py-2 "
              placeholder="Enter in Game username"
              onChange={handleFormChange}
            />
            <label className="self-start" htmlFor="rank">
              Rank *
            </label>
            <select
              name="rank"
              id="rank"
              className="bg-[#3a3a3a] px-4 py-2 w-[215.5px]"
              onChange={handleFormChange}
            >
              {selectedGame?.ranks.map((rank, idx) => {
                return (
                  <option value={idx + 1} key={idx + 1}>
                    {rank.name}
                  </option>
                );
              })}
            </select>
          </>
        )}
        <div
          className="bg-[#3a3a3a] px-4 py-2 mt-4 w-[150px] text-center cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </div>
        <div className="flex flex-col mt-10">
          <span className="text-lg font-semibold">
            Guidelines for clip submission
          </span>
          <span>⏱️ 8-60 seconds length</span>
          <span>🎞️ 720p minimum quality</span>
          <span>🎬 No Montages</span>
          <span>🕵️ Make sure your clip is not private</span>
        </div>
      </form>
    </div>
  );
}

export default Upload;
