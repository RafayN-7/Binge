import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import Videoplayer4 from "./Pages/Videoplayer4";
import Moviepage from "./Pages/Moviepage";
import Videoplayer3 from "./Pages/Videoplayer3";
import "video.js/dist/video-js.css"; 
import videojs from "video.js";
import { useState, useEffect, useRef } from "react";
import Movies from "./Pages/Movies";
import Videoplayer2 from "./Pages/Videoplayer2";
import TvSeries from "./Pages/TvSeries";
import TvShowPage from "./Pages/TvShowPage";
import SearchPage from "./Pages/SearchPage";
import Videoplayer from "./Pages/Videoplayer";

export const App = () => {

  return (
    <div>
       <Navbar/>
      
       <Routes>
        <Route path={"/"} element= {<Homepage/>}/>
        <Route path={"/movie/:id"} element= {<Moviepage/>} />
        <Route path={"Movies"} element= {<Movies/>}/>
        <Route path={"/TvSeries"} element= {<TvSeries/>}/>
        <Route path={"/tv/:id"} element= {<TvShowPage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/Videoplayer/:id" element={<Videoplayer/>} />
        <Route path="/Videoplayer2/:id" element={<Videoplayer2/>} />
        <Route path="/Videoplayer3/:id" element={<Videoplayer3/>} />
        <Route path="/Videoplayer4/:id" element={<Videoplayer4/>} />

       </Routes>  
    </div>
 
  );
};

export default App;