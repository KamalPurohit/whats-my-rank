const mongoose = require("mongoose");

const clipsShceme = mongoose.Schema({
  clipUrl: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "games",
  },
  clipId:{
    type:String,
    required: true,
  }
},{timeStamp:true});

const clips = mongoose.model('clips',clipsShceme);

module.exports = clips