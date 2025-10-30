
import React from "react";
import { useParams } from 'react-router';
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getSimilarMovies } from '../api/tmdb-api';

const SimilarMoviesPage = (props) => {
	const { id } = useParams();

	const { data, error, isPending, isError } = useQuery({
		queryKey: ['similar', { id }],
		queryFn: getSimilarMovies,
	});

	if (isPending) return <Spinner />;
	if (isError) return <h1>{error.message}</h1>;

	const movies = (data && data.results) || [];
	movies.forEach(m => {
		if (!m.genre_ids && m.genres) m.genre_ids = m.genres.map(g => g.id);
	});

	return (
		<PageTemplate
			title="Similar Movies"
			movies={movies}
			action={(movie) => <AddToFavoritesIcon movie={movie} />}
		/>
	);
}

export default SimilarMoviesPage;

