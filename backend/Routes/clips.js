
const express = require('express');
const { addNewClip, getRandomClips } = require('../Controllers/clips');

const router = express.Router();

router.route('/').post(addNewClip)
router.route('/:gameId').get(getRandomClips)


module.exports = {clipRoutes :router}