const games = require("../Models/games");

const addNewGame = async (req, res) => {
  const { name, ranks, bannerImg } = req.body;
  if (!name || !ranks || !bannerImg) {
    return res.status(400).json({ message: "please enter all data" });
  }
  await games.create({
    name,
    ranks,
    bannerImg,
  });
  return res.status(201).json({ message: "Game Added" });
};

const getGameById = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: "send game id" });
  const gameDetials = await games.findById(req.params.id);
  if (!gameDetials) return res.status(404).json({ message: "game not found" });
  return res.json({ message: "success", gameDoc: gameDetials });
};

const getAllGames = async (req, res) => {
  const allGames = await games.find({});
  if (!allGames) return res.status(404).json({ message: "Erorr" });
  return res.json({ message: "success", gameDoc: allGames });
};

const getGameBannerById = async (req,res)=>{
  const gameNameAndBanner = await games.findById(req.params.id,['bannerImg','name'])
  return res.json(gameNameAndBanner);
}

const getAllGamesBanner = async (req,res)=>{
  const allGameBanner = await games.find({},['bannerImg','name']);
  return res.json(allGameBanner);
}
module.exports = {
  addNewGame,
  getAllGames,
  getGameBannerById,
  getGameById,
  getAllGamesBanner
};
