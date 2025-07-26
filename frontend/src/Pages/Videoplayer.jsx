import React from 'react';
import { useParams } from 'react-router';

function Videoplayer() {
  const { id } = useParams();
  const videoSource = `https://player.videasy.net/movie/${id}`;

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

    }, [id]);

  return (
    <div className="video-container flex justify-center items-center min-h-screen bg-[#181818] p-4">
      <iframe
        src={videoSource}
        title={`Videasy Embedded Video - ${id}`}

        className="rounded-lg shadow-lg w-full max-w-4xl h-[60vh] md:h-[70vh]"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Videoplayer;