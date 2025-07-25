import { Bookmark, Play } from 'lucide-react'
import herobg from '../assets/herobg2.jpg'
import { useEffect, useState } from 'react';
import { Link } from 'react-router';


const TvHero = () => {
  const [movie, setMovie] = useState(null);
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjhhZGFlYTdlYmI4MTgxZjAwNzVmYTQ2MDViMmFlOCIsIm5iZiI6MTc1MTc5MzYwNi42NDksInN1YiI6IjY4NmEzZmM2MDM3YjU4ZTQxYTcwMjc4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XHV99URez_MPe9LT1hOVKXimGBRFtnptNcZX18JNgo'
  }
};

useEffect(() => {
fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => {
    if(res.results &&  res.results.length > 0){
      const randomIndex = Math.floor (Math.random() * res.results.length);
      setMovie(res.results[randomIndex]);
    }
  })
  .catch(err => console.error(err));
},[])


  if(!movie){
    return <p>Loading...</p>
  }
  return (
    <div className='text-white relative'>
      <div >
        <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt="bg-img" className='w-full rounded-lg h-[620px] object-center object-cover'/>
               
               
               <h3 className="flex justify-center items-center py-3 text-2xl font-bold">{movie.name || movie.original_name} </h3>
                </div>

        <div className='flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium mb-10 ml-10'>
          
          {/*
            <button className='flex justify-center items-center bg-white hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'>
                <Bookmark className='mr-2 w-4 h-5 md:w-5 md:h-5 '/>Save for Later</button>
                */}

            <Link to={`/tv/${movie.id}`}>
            <button className='flex justify-center items-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'>
                <Play className='mr-2 w-4 h-5 md:w-5 md:h-5 ' />Watch Now</button>
            </Link>
            
        </div>
    </div>
  )
}

export default TvHero