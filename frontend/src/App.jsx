import { useEffect, useState } from "react";
import "./App.css";
import {Game, Home, Results, Upload} from "./Screens"
import {Route,Routes} from 'react-router-dom'
import Navbar from "./components/Navbar";
import ResultsById from "./Screens/ResultsById";

function App() {
 

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:game" element={<Game/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/results" element={<Results/>}></Route>
        <Route path="/results/:shortId" element={<ResultsById/>}></Route>
      </Routes>
      
    </>
  );
}

export default App;
