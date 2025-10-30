import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getTopRatedMovies } from '../api/tmdb-api';

const TopRatedMoviesPage = (props) => {
	const { data, error, isPending, isError } = useQuery({
		queryKey: ['top_rated'],
		queryFn: getTopRatedMovies,
	});

	if (isPending) return <Spinner />;
	if (isError) return <h1>{error.message}</h1>;

	const movies = (data && data.results) || [];
	movies.forEach(m => {
		if (!m.genre_ids && m.genres) m.genre_ids = m.genres.map(g => g.id);
	});

	return (
		<PageTemplate
			title="Top Rated"
			movies={movies}
			action={(movie) => <AddToFavoritesIcon movie={movie} />}
		/>
	);
}

export default TopRatedMoviesPage;

