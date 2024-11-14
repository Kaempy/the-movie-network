import Search from '@src/icons/search';
import { Movies } from '@src/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import MovieItem from './MovieItem';
import Pagination from './Pagination';

export type PaginationState = {
  page: number;
  search?: string;
};

const MovieList = () => {
  const movies = useLoaderData() as Movies | undefined;
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<PaginationState>({
    page: movies?.page ?? 1,
  });
  const [searchTerm, setSerchTerm] = useState<string>('');
  const handlSearch = ({ searchKeyword }: { searchKeyword: string }) => {
    setPagination({
      page: 1,
      search: searchKeyword ? searchKeyword : undefined,
    });
    navigate(`?page=1&search=${searchKeyword}`);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchTerm(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlSearch({ searchKeyword: searchTerm });
  };
  return (
    <section className="p-8">
      <div className="my-20 text-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-indigo-600 drop-shadow-lg">
          Welcome to the Movie Network
        </h1>
        <p className="mt-4 text-2xl text-wrap">
          Dive into a world of movies, explore genres, and discover your next
          favorite film.
        </p>
      </div>

      <div className="flex gap-4 my-2">
        <form
          onSubmit={handleSubmit}
          className="border-[0.5px] flex border-slate-500 rounded-full w-full p-1"
        >
          <input
            // type="search"
            name="search"
            onChange={handleChange}
            placeholder="Search by movie name..."
            className="font-title w-full outline-none p-2 rounded-full"
          />
          <button
            type="submit"
            className="font-title transition-all duration-300 ease-in-out transform hover:bg-slate-600 hover:w-28 hover:scale-105 mx-auto flex items-center justify-center bg-slate-500 p-2 rounded-full"
          >
            <Search />
          </button>
        </form>
        <button className=" hover:bg-slate-600 font-bold mx-auto flex flex-shrink-0 items-center justify-center bg-slate-500 px-6 py-1 rounded-full">
          Add Movie
        </button>
      </div>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 items-center justify-center">
        <MovieItem data={movies?.results} />
      </section>
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        total_pages={movies?.total_pages ?? 1}
      />
    </section>
  );
};

export default MovieList;
