import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getMoviesBySearch } from '../api/tmdb-api';
import { useLocation } from 'react-router';

const SearchResultsPage = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['search', { query }],
    queryFn: getMoviesBySearch,
    enabled: Boolean(query && query.trim().length > 0),
  });

  if (!query || query.trim() === '') {
    return <h2>Please enter a search term.</h2>;
  }

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = (data && data.results) || [];
  movies.forEach(m => {
    if (!m.genre_ids && m.genres) m.genre_ids = m.genres.map(g => g.id);
  });

  return (
    <PageTemplate
      title={`Search results for "${query}"`}
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
}

export default SearchResultsPage;
