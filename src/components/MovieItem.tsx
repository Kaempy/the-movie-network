import { Movie } from '@src/types';
import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  data?: Movie[];
};
const MovieItem = ({ data }: Props) => {
  return (
    <Fragment>
      {data?.map((movie) => (
        <Link
          to={`/movies/${movie.id}`}
          key={movie.id}
          className="border rounded-xl bg-[#1d1f26] border-[#383d47]"
        >
          <div className="relative rounded-xl group">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={300}
              title={movie.title}
              className="object-contain rounded-xl"
            />
            <div className="absolute bg-black/50 rounded-xl inset-0" />
            {/* <h6 className="absolute font-semibold px-3 text-xs py-0.5 rounded-full top-4 left-4 bg-slate-500/75 text-white">
              New
            </h6> */}

            {/* Fade-in overlay */}
            <div className="bg-black/80 h-[250px] rounded-xl absolute w-full bottom-0 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-start flex-col gap-2 p-4">
                <h4 className="font-semibold text-base">{movie.title}</h4>
                <p className="text-xs text-start">{movie.overview}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-slate-400 font-semibold">genre</p>
                  <div className="bg-slate-400 w-1.5 h-1.5 rounded-full" />
                  <p className="text-xs text-slate-400 font-semibold">genre</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <Outlet />
    </Fragment>
  );
};

export default MovieItem;
