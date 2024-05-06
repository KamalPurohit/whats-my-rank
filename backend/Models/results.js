const mongoose = require("mongoose");

const resultsSchema = mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  results: { type: Array, default: [] },
  points: {
    type: Number,
    required: true,
  },
  gameDetails: {
    bannerImg: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

const results = mongoose.model("results", resultsSchema);

module.exports = results;
