type Movies = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};

type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: 'en';
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};
type Genre = {
  id: number;
  name: string;
};
type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};
type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};
type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
type SingleMovie = Omit<Movie, 'genre_ids'> & {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
};

export type { Movie, Movies, SingleMovie };
