const mongoose = require("mongoose")

const connectMongoDb = async (url) =>{
    await mongoose.connect(url)
    .then(()=>{
        console.log("Mongo Db Connected!");
    }).catch((err)=>{
        console.log("Mongo Db Connection error",err);
    })
}

module.exports = {connectMongoDb}