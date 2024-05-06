const mongoose = require("mongoose");

const gamesScheme = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  ranks: [{
    name:{
        type:String,
        unique: true,
        required: true,
    },
    rankLogo:{
        type:String,
        unique: true,
        required: true,
    }
  }],
  bannerImg:{
    type: String,
    required:true,
  }
},{timeStamp:true});

const games = mongoose.model('games',gamesScheme);

module.exports = games