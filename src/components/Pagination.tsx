import { cn } from '@src/lib/utils';
import { memo } from 'react';

type Props = {
  total_pages: number;
  page: number;
  handleChange: (type: 'prev' | 'next') => void;
};

const Pagination = ({ total_pages, page, handleChange }: Props) => {
  return (
    <div className="flex mt-12 items-center justify-center gap-4">
      <button
        type="button"
        className="bg-slate-500/75 font-bold rounded-md text-lg px-6 py-2 disabled:cursor-not-allowed disabled:bg-slate-600"
        onClick={() => handleChange('prev')}
        disabled={page === 1}
      >
        <span
          className={cn(
            'text-transparent bg-gradient-to-r from-fuchsia-400 to-green-500 bg-clip-text font-bold',
            page === 1 && 'text-slate-300'
          )}
        >
          Prev
        </span>
      </button>
      <button
        type="button"
        className="bg-slate-500/75 font-bold text-lg rounded-md px-6 py-2 
          disabled:bg-slate-600"
        onClick={() => handleChange('next')}
        disabled={page === total_pages}
      >
        <span
          className={cn(
            'text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text font-bold',
            page === total_pages && 'text-slate-300'
          )}
        >
          Next
        </span>
      </button>
    </div>
  );
};

export default memo(Pagination);
