import Search from '@src/icons/search';
import { startTransition, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  action: (payload: FormData) => void;
  page: number;
  searchQuery?: string;
  onSearch: (search: string) => void;
  searchHistory: string[];
};

const SearchItem = ({
  action,
  page,
  onSearch,
  searchHistory,
  searchQuery,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery ?? '');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // // Update inputValue when searchQuery changes
  useEffect(() => {
    if (searchQuery) setSearchInput(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() === '') {
      return toast.warning('Invalid', {
        description: 'Please enter a search query!',
      });
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get('search') as string;
    onSearch(search);
    // Wrap the action call in startTransition
    startTransition(() => {
      action(formData); // Trigger the search action asynchronously
    });
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    inputRef.current?.focus();
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <form
        action={action}
        className="border-[0.5px] flex border-slate-500 rounded-full w-full p-1"
        onSubmit={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(true)}
      >
        <input
          ref={inputRef}
          name="search"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search by movie name..."
          autoComplete="off"
          className="font-title w-full outline-none p-2 bg-inherit rounded-full"
        />
        <input type="hidden" name="page" value={page} />
        <button
          type="submit"
          className="font-title transition-all duration-300 ease-in-out transform hover:bg-slate-600 hover:w-28 hover:scale-105 mx-auto flex items-center justify-center bg-slate-500 p-2 rounded-full"
          // disabled={searchInput.trim() === ''}
        >
          <Search />
        </button>
      </form>
      {isFocused && searchHistory.length > 0 && (
        <div className="absolute bg-slate-500 z-10 shadow-md rounded-md top-12 max-h-40 overflow-y-auto py-2 w-full">
          {searchHistory.map((suggestion, index) => (
            <p
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-slate-600"
            >
              {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchItem;
