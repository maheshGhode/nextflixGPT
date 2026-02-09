import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies)
  return (
    movies.nowPlayingMovies &&(<div>
      <div className="bg-black">
        <div className="pl-4 -mt-56">
           <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies }/>
           <MovieList title={"Popular Movies"} movies={movies?.popularMovies }/>
           <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies }/>
           <MovieList title={"Up Coming Movies"} movies={movies?.upComingMovies }/>
        </div>
      </div>
    </div>)
  )
}

export default SecondaryContainer
