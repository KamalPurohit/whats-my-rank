const resultsModel = require("../Models/results");

const addNewResults = async (req, res) => {
  const { results, points, shortId, gameDetails } = req.body;
  console.log(req.body);
  if (
    !results ||
    !points ||
    !shortId ||
    !gameDetails.bannerImg ||
    !gameDetails.name
  ) {
    return res.status(400).json({ message: "client error!" });
  }
  await resultsModel.create({
    results,
    points,
    shortId,
    gameDetails,
  });
  return res.status(200).json({ message: "success!" })
};


const getResultById = async (req,res) =>{
    const shortId = req.params.shortId;
    if(!shortId) return res.json({message:'no short id'})
    const results = await resultsModel.findOne({shortId:shortId});
    if(!results) return res.json({message:'not found'})
    return res.json(results)
}

module.exports ={addNewResults,getResultById}