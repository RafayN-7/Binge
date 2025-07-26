import { Play } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';
import Footer from '../components/Footer';

const TvShowPage = () => {

    const {id} = useParams();
    const [movie, setMovie] = useState(null)
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const [seasonsData, setSeasonsData] = useState({});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjhhZGFlYTdlYmI4MTgxZjAwNzVmYTQ2MDViMmFlOCIsIm5iZiI6MTc1MTc5MzYwNi42NDksInN1YiI6IjY4NmEzZmM2MDM3YjU4ZTQxYTcwMjc4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XHV99URez_MPe9LT1hOVKXimGBRFtnptNcZX18JNgo'
  },
};



useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
  .then((res) => res.json())
  .then((res) => setMovie(res))
  .catch((err) => console.error(err));

  fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setRecommendations(res.results || []))
  .catch(err => console.error(err));

   fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    const trailer = res.results?.find((vid) => vid.site === "YouTube" && vid.type === "Trailer")
    setTrailerKey(trailer?.key || null );
  })
  .catch(err => console.error(err)); 
}, [id]);

    // New useEffect to fetch season details when movie data is available
    useEffect(() => {
        if (movie && movie.seasons) {
            movie.seasons.forEach(season => {
                // Skip fetching if season number is 0 (often for specials that don't have episodes in the same way)
                if (season.season_number === 0) return; 

                fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?language=en-US`, options)
                    .then(res => res.json())
                    .then(res => {
                        setSeasonsData(prev => ({
                            ...prev,
                            [season.season_number]: res
                        }));
                    })
                    .catch(err => console.error(`Error fetching season ${season.season_number}:`, err));
            });
        }
    }, [movie, id]); // Depend on 'movie' and 'id'

if (!movie){
    return( 
    <div className="flex items-center justify-center h-screen">
        <span className="text-xl text-red-500">Loading...</span>
        </div>
        );  
}

    const formatRuntime = (runtimeArray) => {
        if (!runtimeArray || runtimeArray.length === 0) return "N/A";
        return `${runtimeArray[0]} mins`; // Assuming you want the first episode runtime
    };

  return (
    <div className="min-h-screen bg-[#181818] text-white">
        <div className="relative h-[70vh] flex items-end" 
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 700
        }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

            <div className="relative z-10 flex items-end p-8 gap-8">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={`${movie.name} poster`} className="rounded-lg shadow-lg w-48 hidden md:block" />
                        
                        <div>
                <h1 className="text-4xl font-bold mb-2">{movie.name || movie.original_name}</h1>
                <div className="flex items-center gap-4 mb-2">
                    <span>⭐{movie.vote_average?.toFixed(1)}</span>
                    <span>{movie.first_air_date?.slice(0, 4)}</span>
                    <span>{movie.number_of_seasons} seasons, {movie.number_of_episodes} episodes</span>
                    <span>{formatRuntime(movie.episode_run_time)}</span> 
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres.map((genre)=>(
                        <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                            {genre.name}
                        </span>
                    ))}
                </div >
                <p className="max-w-2xl text-gray-200 ">{movie.overview}</p>


                    <div className="mt-6 flex ml-10">
                <Link to= {`/videoplayer3/${id}`} 
                >
                    <h3 className="font-semibold ml-10">Option A:</h3>
            <button className='flex justify-center items-center bg-[#e50914] text-white py-3 px-8 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4'>
                <Play className='mr-2 w-4 h-5 md:w-5 md:h-5 ' />Watch Now</button>
            </Link>
                

                    
                <Link to= {`/videoplayer4/${id}`} 
                >
                    <h3 className="font-semibold ml-20">Option B:</h3>
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
                            <span className="font-semibold text-white">First Air Date:</span>
                            <span className="ml-2">{movie.first_air_date}</span>
                        </li>

                        <li>
                            <span className="font-semibold text-white">Original Language:</span>
                            <span className="ml-2">{movie.original_language?.toUpperCase()}
                            </span>
                        </li>

                        <li>
                                <span className="font-semibold text-white">Budget:</span>
                                <span className="ml-2">{movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}</span>
                            </li>
                            <li>
                                <span className="font-semibold text-white">Revenue:</span>
                                <span className="ml-2">{movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}</span>
                            </li>
                            <li>
                                <span className="font-semibold text-white">Production Companies:</span>
                                <span className="ml-2">{movie.production_companies && movie.production_companies.length > 0 ? movie.production_companies.map((c) => c.name).join(", ") : "N/A"}</span>
                            </li>
                            <li>
                                <span className="font-semibold text-white">Countries:</span>
                                <span className="ml-2">{movie.production_countries && movie.production_countries.length > 0 ? movie.production_countries.map((c) => c.iso_3166_1).join(", ") : "N/A"}</span> {/* Use iso_3166_1 for country code */}
                            </li>
                            <li>
                                <span className="font-semibold text-white">Spoken Languages:</span>
                                <span className="ml-2">{movie.spoken_languages && movie.spoken_languages.length > 0 ? movie.spoken_languages.map((c) => c.english_name || c.name).join(", ") : "N/A"}</span> {/* Use english_name */}
                            </li>
                            <li>
                                <span className="font-semibold text-white">Number of Seasons:</span>
                                <span className="ml-2">{movie.number_of_seasons}</span>
                            </li>
                            <li>
                                <span className="font-semibold text-white">Number of Episodes:</span>
                                <span className="ml-2">{movie.number_of_episodes}</span>
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

         {/* Seasons and Episodes Section */}
            <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Seasons & Episodes</h2>
                {movie.seasons && movie.seasons.length > 0 ? (
                    <div className="space-y-6">
                        {movie.seasons
                            .filter(season => season.season_number !== 0) // Filter out "Specials" if you don't want them listed here
                            .sort((a, b) => a.season_number - b.season_number) // Sort seasons numerically
                            .map((season) => (
                            <div key={season.id} className="bg-[#232323] rounded-lg shadow-lg p-4">
                                <h3 className="text-xl font-semibold mb-3">{season.name} ({season.air_date ? season.air_date.slice(0, 4) : 'N/A'}) - {season.episode_count} Episodes</h3>
                                <p className="text-gray-400 text-sm mb-4">{season.overview || "No overview available for this season."}</p>
                                
                                {seasonsData[season.season_number] && seasonsData[season.season_number].episodes && seasonsData[season.season_number].episodes.length > 0 ? (
                                    <div className="space-y-3">
                                        {seasonsData[season.season_number].episodes.map((episode) => (
                                            <div key={episode.id} className="flex items-center justify-between bg-[#1f1f1f] p-3 rounded-md">
                                                <div>
                                                    <p className="font-medium">E{episode.episode_number}: {episode.name}</p>
                                                    <p className="text-gray-400 text-sm">{episode.air_date} - {episode.runtime ? `${episode.runtime} mins` : 'N/A'}</p>
                                                </div>
                                                <div className="flex gap-4">
                                                <Link to={`https://player.videasy.net/tv/${id}/${season.season_number}/${episode.episode_number}`} target="_blank" rel="noopener noreferrer">
                                                    <button className='flex items-center bg-[#e50914] text-white py-2 px-4 rounded-full text-xs'>
                                                        <Play className='mr-1 w-3 h-3' /> Watch A
                                                    </button>
                                                </Link>
                                                <Link to={`https://vidsrc.xyz/embed/tv/${id}/${season.season_number}/${episode.episode_number}`} target="_blank" rel="noopener noreferrer">
                                                    <button className='flex items-center bg-[#0d6efd] text-white py-2 px-4 rounded-full text-xs'>
                                                        <Play className='mr-1 w-3 h-3' /> Watch B
                                                    </button>
                                                </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No episode details available for this season yet.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No season information available for this TV show.</p>
                )}
            </div>
            {/* End Seasons and Episodes Section */}
 
        {recommendations.length > 0 && (
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-4">You might also like:</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                        {recommendations.slice(0, 20).map((rec) => (
                            <div key={rec.id} className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition">
                                <Link to={`/tv/${rec.id}`}> 
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                                        alt={`${rec.name} poster`} 
                                        className="w-full h-80 object-cover"
                                    />
                                    <div className="p-2">
                                        <h3 className="text-1xl font-semibold">
                                            {rec.name || rec.original_name}
                                            <span className="text-xs text-gray-400 px-2">({rec.first_air_date?.slice(0, 4)})</span>
                                        </h3>
                                        <span className="text-sm ">⭐ {movie.vote_average?.toFixed(1)}</span> 
                                
                                
                            </div>
                            </Link>
                        </div>
                    ))} 
                </div>
                
            </div>
        )} 
        <Footer/>
    </div>
    
    );
    
};

export default TvShowPage