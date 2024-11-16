import EmptyState from '@src/shared/EmptyState';
import { Movie } from '@src/types';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';
import cover from '../../public/cover.webp';
import empty from '../../public/empty.png';

type Props = {
  data?: Movie[];
};
const MovieItem = ({ data }: Props) => {
  return (
    <Fragment>
      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="No items found!"
          subTitle="No data available to display"
          img={empty}
        />
      ) : (
        data?.map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className="border rounded-xl bg-[#1d1f26] border-[#383d47]"
          >
            <div className="relative rounded-xl w-full group">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={300}
                  title={movie.title}
                  className="object-contain aspect-square mx-auto"
                  priority
                />
              ) : (
                <Image
                  src={cover}
                  alt={movie.title}
                  width={500}
                  height={300}
                  title={movie.title}
                  className="object-contain aspect-square mx-auto"
                  placeholder="blur"
                  priority
                />
              )}
              <div className="absolute bg-black/50 rounded-xl inset-0" />
              {/* Fade-in overlay */}
              <div className="bg-black/65 h-[250px] rounded-xl absolute w-full bottom-0 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex items-start flex-col gap-2 p-4">
                  <h4 className="font-semibold text-base">{movie.title}</h4>
                  <p className="text-xs text-start">{movie.overview}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </Fragment>
  );
};

export default MovieItem;
