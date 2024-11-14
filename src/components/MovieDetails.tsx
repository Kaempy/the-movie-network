import Play from '@src/icons/play';
import { formatDate } from '@src/lib/utils';
import { SingleMovie } from '@src/types';
import { Link, useLoaderData } from 'react-router-dom';

const MovieDetails = () => {
  const movie = useLoaderData() as SingleMovie | undefined;
  console.log(movie, 'movie');

  return (
    <div className="flex min-h-dvh h-full flex-col text-white bg-black">
      <div
        className="relative border border-b-[1px] border-x-0 border-t-0 border-slate-800 h-[850px] bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        }}
      >
        <button className="border border-slate-400 z-10 absolute left-16 top-16 rounded-full px-4 py-2 font-bold h-14">
          <Link to="/">Back to Movies</Link>
        </button>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
          <div className="absolute left-16 bottom-16 text-start space-y-4">
            <h1 className="text-5xl font-bold mb-4">{movie?.title}</h1>
            <p className="text-lg mb-6 max-w-2xl text-slate-300 mx-auto">
              {movie?.overview}
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 w-40 flex items-center justify-center gap-4 rounded bg-red-600 hover:bg-red-700 font-semibold">
                <Play />
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="p-16 flex items-center justify-between w-full mx-auto max-w-7l text-start">
        <div>
          <div className="w-full flex gap-2 max-w-[500p] mb-4">
            <span className="italic text-slate-400 text-6xl font-title">“</span>
            <h3 className="text-4xl font-bold max-w-[400p] w-full text-slate-300 ">
              {movie?.tagline}
            </h3>
            <span className="italic font-title text-slate-400 text-6xl">”</span>
          </div>
          <ul className="mb-4 flex gap-3 items-center">
            {/* <span className="text-slate-400">Genres:</span> */}
            {movie?.genres.map((genre, index) => (
              <li
                key={genre.id}
                className={`text-transparent text-lg px-2 py-1 font-bold rounded-md bg-clip-text transition-colors duration-300 ${
                  index % 5 === 0
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : index % 5 === 1
                    ? 'bg-gradient-to-r from-green-400 to-blue-500'
                    : index % 5 === 2
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                    : index % 5 === 3
                    ? 'bg-gradient-to-r from-teal-400 to-cyan-500'
                    : 'bg-gradient-to-r from-indigo-400 to-red-500'
                }`}
              >
                {genre.name}
              </li>
            ))}
          </ul>

          <ul className="mb-4 flex gap-3 items-center">
            {movie?.production_companies.map((company, index) =>
              company.logo_path ? (
                <li
                  key={company.id}
                  className={`text-white bg-white font-medium px-2 py-1 rounded-md bg-clip-text  text-inherit transition-colors duration-300 ${
                    index % 5 === 0
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : index % 5 === 1
                      ? 'bg-gradient-to-r from-green-400 to-blue-500'
                      : index % 5 === 2
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                      : index % 5 === 3
                      ? 'bg-gradient-to-r from-teal-400 to-cyan-500'
                      : 'bg-gradient-to-r from-indigo-400 to-red-500'
                  }`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                    width={100}
                    height={100}
                    alt={company.name}
                    className="bg-white object-contain"
                  />
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div>
          <p className="mb-4">
            <span className="text-slate-400">Release Date:</span>
            <span>&nbsp;{movie ? formatDate(movie.release_date) : 'N/A'}</span>
          </p>
          <p className="mb-4">
            <span className="text-slate-400">Runtime:</span>&nbsp;
            {movie?.runtime}
            &nbsp; minutes
          </p>
          <p className="mb-4">
            <span className="text-slate-400">Rating:</span>{' '}
            {movie?.vote_average} / 10 ({movie?.vote_count}
            &nbsp; votes)
          </p>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
{
  /* <section className="p-8">
  <h2 className="text-3xl font-bold mb-4">Similar Movies</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {similarMovies?.map((item) => (
      <div key={item.id} className="bg-[#1d1f26] p-4 rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
          alt={item.title}
          className="w-full h-56 object-cover rounded-lg mb-2"
        />
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-400">{item.release_date}</p>
      </div>
    ))}
  </div>
</section> */
}
