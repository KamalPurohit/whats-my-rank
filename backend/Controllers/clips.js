const { default: mongoose } = require("mongoose");
const clip = require("../Models/clips");

const addNewClip = async (req, res) => {
  const { userName, clipUrl, rank, clipId, gameId } = req.body;
  if (!userName || !clipUrl || !rank || !clipId || !gameId) {
    return res.status(400).json({ message: "please enter all feilds" });
  }
  await clip.create({
    userName,
    clipUrl,
    rank,
    clipId,
    gameId,
  });
  return res.json({ message: "success" });
};

const getRandomClips = async (req, res) => {
  const gameId = req.params.gameId;
  const randomClips = await clip.aggregate([
    { $match: {  'gameId': new mongoose.Types.ObjectId(gameId) } },
    { $sample: { size: 3 } },
  ])
  return res.json(randomClips)
};

module.exports = {
  addNewClip,
  getRandomClips
};

