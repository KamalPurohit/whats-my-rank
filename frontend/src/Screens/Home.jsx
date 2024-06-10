import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import BASE_URL from "../constants";
import { SpinnerInfinity } from "spinners-react";
import logo from "../assets/logo.png"
function Home() {
  const [allGames, setAllGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAllGames = async () => {
    try {
      const res = await axios.get(`${BASE_URL}games/banner`);
      setAllGames(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getAllGames();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#141414] min-h-[100vh] pb-10 flex flex-col items-center pt-10 gap-20">
      <div className="flex  items-center justify-evenly gap-10 w-full h-full flex-wrap">
        {isLoading ? (
          <div className="flex items-center flex-col gap-5">
            <SpinnerInfinity
              size={78}
              thickness={180}
              speed={100}
              color="rgba(170, 172, 57, 1)"
              secondaryColor="rgba(50, 50, 50, 1)"
            />{" "}
            <div className="text-2xl font-medium text-[#525252] flex gap-5 items-center p-4 text-center">
              Please wait, This might take some time.
              <img src={logo}  className="w-6 h-6 "/>
            </div>
          </div>
        ) : (
          allGames.map((game, idx) => {
            return (
              <Link
                to={{
                  pathname: `/${game.name}`,
                }}
                state={{ gameId: game._id }}
                key={idx}
              >
                <div className="flex flex-col items-center justify-center cursor-pointer w-48 overflow-hidden  hover:border-2 hover:border-white">
                  <img
                    src={game.bannerImg}
                    alt={game.name}
                    className="w-48 hover:scale-110 transition ease-in-out "
                    data-tooltip-id={`game${idx}`}
                    data-tooltip-content={game.name}
                  />
                  <Tooltip
                    id={`game${idx}`}
                    place="bottom"
                    className="font-bold"
                  />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
