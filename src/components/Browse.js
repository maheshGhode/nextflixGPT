
import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpComingMovies from '../hooks/useUpCommingMovies';
import Header from './Header'
import MainCOntainer from './MainCOntainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? <GptSearch /> : 
      <>
        <MainCOntainer />
        <SecondaryContainer />
      </>}
    
    </div>
  )
}

export default Browse
