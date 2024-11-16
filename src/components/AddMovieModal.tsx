import { fetchGenres } from '@src/app/actions';
import { GenreRes, Movie } from '@src/types';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

type Props = {
  onClose: () => void;
  onSubmit: (newMovie: Movie) => void;
};
type FormData = {
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
};
const AddMovieModal = ({ onClose, onSubmit }: Props) => {
  const [genres, setGenres] = useState<GenreRes['genres']>([]);
  const id = useId();
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [{ title, overview, release_date, genre_ids }, setFormValues] =
    useState<FormData>({
      title: '',
      overview: '',
      release_date: '',
      genre_ids: [],
    });
  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        if (data?.genres) {
          // Ensure no duplicate genres
          const uniqueGenres = Array.from(
            new Map(data.genres.map((genre) => [genre.id, genre])).values()
          );
          setGenres(uniqueGenres);
        }
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    getGenres();
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleClick = () => {
    dateRef.current?.showPicker();
  };
  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value, 10)
    );
    setFormValues((prev) => ({
      ...prev,
      genre_ids: [...prev.genre_ids, ...selected],
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      // Construct the movie object based on the form values
      const newMovie: Movie = {
        title,
        overview,
        release_date,
        poster_path: null,
        backdrop_path: null,
        adult: false,
        genre_ids,
        id, // For the sake of this example, generating a random id
        original_language: 'en',
        original_title: title,
        popularity: 0, // Can be adjusted based on additional logic if needed
        video: false, // Set to `false` or based on your logic
        vote_average: 0, // Default, can be updated later
        vote_count: 0, // Default, can be updated later
      };

      // Call onSubmit with the new movie object
      onSubmit(newMovie);
      onClose(); // Close the modal after submission
    }
  };
  const genreList = genre_ids.map((genreId) => String(genreId));

  return (
    <div className="fixed inset-0 z-20 bg-black backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#0e1217] rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-4">Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              required
              className="input"
              placeholder="Enter movie title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="overview" className="block text-sm font-medium">
              Overview
            </label>
            <textarea
              id="overview"
              name="overview"
              value={overview}
              onChange={handleChange}
              required
              className="input resize-none"
              placeholder="Enter movie overview"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="release_date" className="block text-sm font-medium">
              Release Date
            </label>
            <input
              ref={dateRef}
              type="date"
              id="release_date"
              name="release_date"
              required
              value={release_date}
              onChange={handleChange}
              onClick={handleClick}
              className="input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="genre_ids" className="block text-sm font-medium">
              Genres
            </label>
            <select
              id="genre_ids"
              name="genre_ids"
              required
              multiple
              value={genreList}
              onChange={handleGenreChange}
              className="input"
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
