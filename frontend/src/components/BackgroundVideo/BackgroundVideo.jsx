import React from 'react';

/**
 * Component to render the background video
 * @returns The BackgroundVideo component
 */
const BackgroundVideo = () => {
  return (
    <video autoPlay loop muted id="background-video">
      <source src="video/v2.mp4" type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;