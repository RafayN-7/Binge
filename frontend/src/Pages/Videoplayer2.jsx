import React from 'react';
import { useParams } from 'react-router'; // Import useParams to get the ID from the URL

function Videoplayer2 () {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  // Construct the video source URL dynamically using the obtained ID
  // Assuming 'https://player.videasy.net/embed/' is the correct base for embedding
  const videoSource = `https://vidsrc.xyz/embed/${id}`;

  return (
    // Centering the video player on the screen with a dark background
    <div className="video-container flex justify-center items-center min-h-screen bg-[#181818] p-4">
      <iframe
        src={videoSource}
        title={`Videasy Embedded Video - ${id}`}
        // Use Tailwind classes for responsive width and height
        // w-full ensures it takes full width of its container
        // max-w-4xl limits its maximum width on larger screens
        // h-[60vh] sets height to 60% of viewport height, md:h-[70vh] for larger screens
        className="rounded-lg shadow-lg w-full max-w-4xl h-[60vh] md:h-[70vh]"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}


export default Videoplayer2