
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainCOntainer from './MainCOntainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainCOntainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse
