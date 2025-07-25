import { Play } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';
import Footer from '../components/Footer';

const Moviepage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null)
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjhhZGFlYTdlYmI4MTgxZjAwNzVmYTQ2MDViMmFlOCIsIm5iZiI6MTc1MTc5MzYwNi42NDksInN1YiI6IjY4NmEzZmM2MDM3YjU4ZTQxYTcwMjc4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XHV99URez_MPe9LT1hOVKXimGBRFtnptNcZX18JNgo'
  },
};



useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  .then((res) => res.json())
  .then((res) => setMovie(res))
  .catch((err) => console.error(err));

  fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setRecommendations(res.results || []))
  .catch(err => console.error(err));

   fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    const trailer = res.results?.find((vid) => vid.site === "YouTube" && vid.type === "Trailer")
    setTrailerKey(trailer?.key || null );
  })
  .catch(err => console.error(err)); 
}, [id]);

if (!movie){
    return( 
    <div className="flex items-center justify-center h-screen">
        <span className="text-xl text-red-500">Loading...</span>
        </div>
        );  
}


  return (
    <div className="min-h-screen bg-[#181818] text-white">
        <div className="relative h-[70vh] flex item-end" style={
            {backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center"}
        }>
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via transparent to-transparent"></div>

            <div className="relative z-10 flex items-end p-8 gap-8">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="rounded-lg shadow-lg w-48 hidden md:block" />
                        <div>
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex item-center gap-4 mb-2">
                    <span>⭐{movie.vote_average?.toFixed(1)}</span>
                    <span>{movie.release_date}</span>
                    <span>{movie.runtime}mins</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres.map((genre)=>(
                        <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                            {genre.name}
                        </span>
                    ))}
                </div >
                <p className="max-w-2xl text-gray-200 ">{movie.overview}</p>


                    <div className="mt-6 flex ml-10">
                <Link to= {`https://player.videasy.net/movie/${id}`}
                target="_blank">
                    <h3 className="font-semibold ml-10">Option A:</h3>
            <button className='flex justify-center items-center bg-[#e50914] text-white py-3 px-8 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4'>
                <Play className='mr-2 w-4 h-5 md:w-5 md:h-5 ' />Watch Now</button>
            </Link>
                

                    
                <Link to= {`https://vidsrc.xyz/embed/${id}`}
                target="_blank">
                    <h3 className="font-semibold ml-30">Option B:</h3>
            <button className='flex justify-center items-center bg-[#0d6efd] ml-20 text-white py-3 px-8 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4'>
                <Play className='mr-2 w-4 h-5 md:w-5 md:h-5 ' />Watch Now</button>
            </Link>
                    </div>  
            
            </div>
            </div>
        </div>

        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <ul className="text-gray-300 space-y-3">
                        <li>
                            <span className="font-semibold text-white">Status:</span>
                            <span className="ml-2">{movie.status}</span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Released Date:</span>
                            <span className="ml-2">{movie.release_date}</span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Original Language:</span>
                            <span className="ml-2">{movie.original_language?.toUpperCase()}
                            </span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Budget:</span>
                            <span className="ml-2">{movie.budget?`$${movie.budget.toLocaleString()}`: "N/A"}
                            </span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Revenue:</span>
                            <span className="ml-2">{movie.revenue?`$${movie.revenue.toLocaleString()}`: "N/A"}
                            </span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Production Companies:</span>
                            <span className="ml-2">{movie.production_companies && movie.production_companies.length>0? movie.production_companies.map((c) => c.name).join(",") : "N/A"}
                            </span>
                        </li>
                        <li>
                            <span className="font-semibold text-white">Countries:</span>
                            <span className="ml-2">{movie.production_countries && movie.production_countries.length>0? movie.production_countries.map((c) => c.name).join(",") : "N/A"}
                            </span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Spoken Languages:</span>
                            <span className="ml-2">{movie.spoken_languages && movie.spoken_languages.length>0? movie.spoken_languages.map((c) => c.name).join(",") : "N/A"}
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">Tagline:</h3>
                    <p className="italic text-gray-400 mb-6">{movie.tagline || "No Tagline Available."}</p>


                    <h3 className="font-semibold text-white mb-2">Overview:</h3>
                    <p className="text-gray-200">{movie.overview}</p>
                </div>
            </div>
        </div>

        {recommendations.length > 0 && (
            <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">You might also like:</h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {recommendations.slice(0, 20).map((rec)=>(
                        <div key={rec.id} className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition">
                            <Link to={`/movie/${rec.id}`}>
                            <img 
                            src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`} 
                             className="w-full h-80 object-cover"
                            />
                            <div className="p-2">
                                <h3 className="text-1xl font-semibold">{rec.title}
                                <span className="text-xs text-gray-400 px-2">({rec.release_date?.slice(0, 4)})</span>
                                </h3>
                                <span className="text-sm ">⭐ {movie.vote_average?.toFixed(1)}</span>
                                
                                
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
                
            </div>
        )}
        <Footer></Footer>
    </div>
    
    );
    
};

export default Moviepage;