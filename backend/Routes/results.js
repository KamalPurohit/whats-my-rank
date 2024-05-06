const express = require('express');
const { addNewResults, getResultById } = require('../Controllers/results');

const router = express.Router();
router.route('/').post(addNewResults);
router.route('/:shortId').get(getResultById);

module.exports = {resultRoutes:router}