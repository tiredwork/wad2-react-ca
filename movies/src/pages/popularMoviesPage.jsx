import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PopularMoviesPage = (props) => {
	const { data, error, isPending, isError } = useQuery({
		queryKey: ['popular'],
		queryFn: async () => {
			const res = await fetch(
				`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
			);
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.status_message || 'Something went wrong');
			}
			return res.json();
		},
	});

	if (isPending) return <Spinner />;
	if (isError) return <h1>{error.message}</h1>;

	const movies = (data && data.results) || [];
	movies.forEach(m => {
		if (!m.genre_ids && m.genres) m.genre_ids = m.genres.map(g => g.id);
	});

	return (
		<PageTemplate
			title="Popular Movies"
			movies={movies}
			action={(movie) => <AddToFavoritesIcon movie={movie} />}
		/>
	);
}

export default PopularMoviesPage;

