import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import NowPlayingMoviesPage from './pages/nowPlayingMoviesPage'
import TopRatedMoviesPage from './pages/topRatedMoviesPage'
import PopularMoviesPage from './pages/popularMoviesPage'
import TrendingMoviesPage from './pages/trendingMoviesPage'
import MovieProvidersPage from './pages/movieProvidersPage'
import SimilarMoviesPage from './pages/similarMoviesPage'
import PlaylistsPage from './pages/playlistsPage'
import SearchResultsPage from './pages/searchResultsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/:id/providers" element={<MovieProvidersPage />} />
            <Route path="/movies/:id/similar" element={<SimilarMoviesPage />} />
            <Route path="/now_playing" element={ <NowPlayingMoviesPage /> } />
            <Route path="/top_rated" element={ <TopRatedMoviesPage /> } />
            <Route path="/popular" element={ <PopularMoviesPage /> } />
            <Route path="/trending" element={ <TrendingMoviesPage /> } />
            <Route path="/playlists" element={ <PlaylistsPage /> } />
            <Route path="/search" element={ <SearchResultsPage /> } />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={ <UpcomingMoviesPage /> } />

          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
