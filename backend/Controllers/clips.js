const { default: mongoose } = require("mongoose");
const clip = require("../Models/clips");

const addNewClip = async (req, res) => {
  const { userName, clipUrl, rank, clipId, gameId } = req.body;
  if (!userName || !clipUrl || !rank || !clipId || !gameId) {
    return res.status(400).json({ message: "please enter all feilds" });
  }
  try{
    const result  = await clip.create({
      userName,
      clipUrl,
      rank,
      clipId,
      gameId,
    });
    return res.json({ message: "success" });
  }
  catch(err){
    if(err.code == 11000) return res.status(400).json({message:'clip already exists'});
    return res.status(500).json({message:'internal server error'})
  }
 
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

