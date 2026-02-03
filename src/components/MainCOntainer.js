import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux';

const MainCOntainer = () => {
    const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

    if(!movies) return null;

    const mainMovies = movies[0];
    const {original_title, overview, id} = mainMovies;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground />
    </div>
  )
}

export default MainCOntainer;
