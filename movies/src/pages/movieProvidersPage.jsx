import React from 'react';
import { useParams } from 'react-router';
import PageTemplate from '../components/templateMoviePage';
import { useQuery } from '@tanstack/react-query';
import { getMovie, getMovieProviders } from '../api/tmdb-api';
import Spinner from '../components/spinner';

const MovieProvidersPage = () => {
	const { id } = useParams();

	const { data: movie, error: movieError, isPending: movieLoading, isError: movieIsError } = useQuery({
		queryKey: ['movie', { id }],
		queryFn: getMovie,
	});

	const { data: providersData, error: provError, isPending: provLoading, isError: provIsError } = useQuery({
		queryKey: ['providers', { id }],
		queryFn: getMovieProviders,
	});

	if (movieLoading || provLoading) return <Spinner />;

	if (movieIsError) return <h1>{movieError?.message}</h1>;
	if (provIsError) return <h1>{provError?.message}</h1>;

	// TMDB returns providers grouped by country code. Prefer US, else pick the first available country.
	const results = providersData?.results || {};
	const countryCode = results['US'] ? 'US' : Object.keys(results)[0];
	const providers = countryCode ? results[countryCode] : null;

	const sections = ['flatrate', 'rent', 'buy', 'ads', 'free'];

	const renderProviders = () => {
		if (!providers) return <p>No provider information available.</p>;

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				{sections.map((sec) => {
					const list = providers[sec];
					if (!list || list.length === 0) return null;
					return (
						<div key={sec}>
							<h3 style={{ textTransform: 'capitalize' }}>{sec}</h3>
							<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
								{list.map((p) => (
									<div key={p.provider_id} style={{ textAlign: 'center' }}>
										{p.logo_path ? (
											<img
												src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
												alt={p.provider_name}
												style={{ display: 'block', maxWidth: 92 }}
											/>
										) : null}
										<div style={{ fontSize: '0.85rem' }}>{p.provider_name}</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<PageTemplate movie={movie}>
			<h2>Where to watch</h2>
			<p>Country: {countryCode || 'N/A'}</p>
			{renderProviders()}
		</PageTemplate>
	);
};

export default MovieProvidersPage;
