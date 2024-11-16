'use server';

import { GenreRes, Movies, SingleMovie } from '@src/types';

const baseUrl = process.env.API_BASE_URL;
const apiKey = process.env.API_KEY;
const token = process.env.API_TOKEN;

type Props = {
  search?: string | FormDataEntryValue | null;
  page?: number | FormDataEntryValue | null;
};

const fetchMovie = async (id: string): Promise<SingleMovie | undefined> => {
  try {
    const res = await fetch(
      `${baseUrl}/movie/${id}?append_to_response=videos&api_key=${apiKey}`
    );
    if (!res.ok) throw new Error('Failed to fetch movie');
    return await res.json();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const fetchMovieList = async ({
  search,
  page = 1,
}: Props): Promise<Movies | undefined> => {
  let url = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}`;
  if (search) {
    url = `${baseUrl}/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
  }
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch movies');
    return await res.json();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

async function searchAction(_: unknown, formData: FormData) {
  const search = formData.get('search');
  const page = formData.get('page');
  return await fetchMovieList({ search, page });
}
const fetchGenres = async (): Promise<GenreRes | undefined> => {
  const endpoint = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
  try {
    const res = await fetch(endpoint);
    const result = await res.json(); // Returns an array of genre objects: { id, name }
    return result;
  } catch (error) {
    console.log('Error fetching genres:', error);
    return undefined;
  }
};

export { fetchGenres, fetchMovie, fetchMovieList, searchAction };
