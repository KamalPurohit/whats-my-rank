const express = require("express");
const { connectMongoDb } = require("./connection");
const cors = require("cors");
const gameRoute = require("./Routes/games");
const { clipRoutes } = require("./Routes/clips");
const dotenv = require("dotenv");
const { resultRoutes } = require("./Routes/results");
const app = express();
const corsOrigin = process.env.CORS_URL;
const PORT = process.env.PORT || 8002;
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin :"https://whatsmyrank.onrender.com"}));

app.get("/", (req, res) => {
  return res.send("hello");
});

app.use("/games", gameRoute);
app.use("/clips", clipRoutes);
app.use('/results',resultRoutes);
connectMongoDb(process.env.MONGO_URI);
app.listen(process.env.PORT, () => {
  console.log("Server Created");
});
