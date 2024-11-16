import MovieList from '@src/components/MovieList';
import { fetchMovieList } from './actions';

const Home = async () => {
  const movies = await fetchMovieList({ search: undefined, page: undefined });

  return <MovieList movies={movies} />;
};
export default Home;
