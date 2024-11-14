import { cn } from '@src/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { type PaginationState } from './MovieList';

type Props = {
  pagination: PaginationState;
  total_pages: number;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
};

const Pagination = ({ pagination, setPagination, total_pages }: Props) => {
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    });
    navigate(`?page=${page}&search=${pagination.search || ''}`);
  };
  return (
    <div className="flex mt-12 items-center justify-center gap-4">
      <button
        type="button"
        className="bg-slate-500/75 font-bold rounded-md text-lg px-6 py-2 disabled:cursor-not-allowed disabled:bg-slate-600"
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
      >
        <span
          className={cn(
            'text-transparent bg-gradient-to-r from-fuchsia-400 to-green-500 bg-clip-text font-bold',
            pagination.page === 1 && 'text-slate-300'
          )}
        >
          Prev
        </span>
      </button>
      <button
        type="button"
        className="bg-slate-500/75 font-bold text-lg rounded-md px-6 py-2 
          disabled:bg-slate-600"
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === total_pages}
      >
        <span
          className={cn(
            'text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text font-bold',
            pagination.page === total_pages && 'text-slate-300'
          )}
        >
          Next
        </span>
      </button>
    </div>
  );
};

export default Pagination;
