import React from 'react';
import './Video.css';
import Playvideo from '../../Components/PlayVideo/Playvideo';
import Recomended from '../../Components/Recommended/Recomended';
import { useParams } from 'react-router-dom';

const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className='play-container'>
      <Playvideo videoId={videoId} />
      <Recomended categoryId={categoryId} />
    </div>
  );
};

export default Video;
