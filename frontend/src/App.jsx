import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import Moviepage from "./Pages/Moviepage";
import "video.js/dist/video-js.css"; 
import Movies from "./Pages/Movies";
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
        <Route path={"/Videoplayer/:id"} element={<Videoplayer/>} />


       </Routes>  
    </div>
 
  );
};

export default App;