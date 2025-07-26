import React from 'react';
import { useParams } from 'react-router';

function Videoplayer() {
  const { id } = useParams();
  const videoSource = `https://player.videasy.net/movie/${id}`;

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