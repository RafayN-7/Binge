import React from 'react';

function VideoPlayer({Id}) {
  const videoSource = `https://player.videasy.net/embed/299534`;

  return (
    <div className="video-container">
      <iframe
        src={`https://player.videasy.net/embed/299534`}
        title={`Videasy Embedded Video - 299534`}
        width="100%"
        height="500px"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>    
    </div>
  );
}

export default VideoPlayer;