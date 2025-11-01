import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";
import MovieList from "../movieList";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const SimilarMovies = ({ movieId, action }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["similar", { id: movieId }],
    queryFn: getSimilarMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  const movies = (data && data.results) || [];
  if (movies.length === 0) return null;

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Similar Movies
      </Typography>
    <Grid container sx={{padding: "20px"}}>
      <MovieList movies={movies} action={action} />
    </Grid>
    </>
  );
};

export default SimilarMovies;
