import React from 'React';

const BackgroundVideo = () => {
  return (
    <video autoPlay loop muted id="background-video">
      <source src="video/v2.mp4" type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;