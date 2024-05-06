const express = require('express')
const games = require("../Models/games");
const { addNewGame, getGameById, getAllGames, getGameBannerById, getAllGamesBanner } = require("../Controllers/games");

const router = express.Router();

router.route('/').post(addNewGame).get(getAllGames);
router.get('/banner',getAllGamesBanner)
router.get('/:id',getGameById)
router.get('/banner/:id',getGameBannerById)

module.exports = router