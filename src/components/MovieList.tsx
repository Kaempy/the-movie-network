'use client';

import { fetchMovieList, searchAction } from '@src/app/actions';
import Loading from '@src/shared/Loading';
import { Movie, Movies } from '@src/types';
import { useActionState, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddMovieModal from './AddMovieModal';
import MovieHeader from './MovieHeader';
import MovieItem from './MovieItem';
import Pagination from './Pagination';
import SearchItem from './SearchItem';

export type PaginationState = {
  page: number;
  search?: string;
};

const MovieList = ({ movies }: { movies?: Movies }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: movies?.page ?? 1,
    search: undefined,
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(searchAction, null);
  const [data, setData] = useState(movies);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (state) {
      setData(state);
    } else if (movies) {
      setData(movies);
    }
  }, [state, movies]);
  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(data));
  }, [data]);

  // Refetch data when pagination or search changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchMovieList(pagination);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleSearch = (search: string) => {
    const filteredResults = data?.results.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredResults?.length) {
      setData((prev) => ({
        ...prev!,
        results: filteredResults,
      }));
      return;
    }
    if (search.trim()) {
      setPagination((prev) => ({ ...prev, search: search }));
      if (!searchHistory.includes(search)) {
        // Add search to history and limit to the last 10 searches
        setSearchHistory((prev) => {
          const updatedHistory = [
            search,
            ...prev.filter((item) => item !== search),
          ];
          return updatedHistory.slice(0, 10);
        });
      }
    }
  };
  const handlePageChange = useCallback((type: 'prev' | 'next') => {
    setPagination((prev) => ({
      ...prev,
      page: type === 'prev' ? Math.max(prev.page - 1, 1) : prev.page + 1,
    }));
  }, []);
  const handleAddMovie = (newMovie: Movie) => {
    setData((prev) => {
      if (!prev) {
        // If prev is undefined, return a new Movies object with the new movie
        return {
          page: 1,
          total_pages: 1,
          total_results: 1,
          results: [newMovie],
        };
      }
      // If prev exists, add the new movie to the results array and update the total results
      return {
        ...prev,
        total_results: prev.total_results + 1,
        results: [newMovie, ...prev.results], // Add the new movie at the start (or you can add it at the end)
      };
    });

    toast.success('Success', { description: 'Movie added successfully!' });
  };
  if (isPending) {
    return <Loading />;
  }
  return (
    <section className="p-8">
      {isModalOpen && (
        <AddMovieModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddMovie}
        />
      )}
      <MovieHeader />
      <div className="flex gap-4 my-2">
        <SearchItem
          action={formAction}
          onSearch={handleSearch}
          page={pagination.page}
          searchQuery={pagination.search}
          searchHistory={searchHistory}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className=" hover:bg-slate-600 font-bold mx-auto flex flex-shrink-0 items-center justify-center bg-slate-500 px-6 py-1 rounded-full"
        >
          Add Movie
        </button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 items-center justify-center">
        <MovieItem data={data?.results} />
      </div>
      <Pagination
        total_pages={data?.total_pages ?? 1}
        page={data?.page ?? 1}
        handleChange={handlePageChange}
      />
    </section>
  );
};

export default MovieList;
