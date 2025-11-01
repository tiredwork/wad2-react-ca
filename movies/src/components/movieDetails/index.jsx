import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Tooltip from "@mui/material/Tooltip";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);


  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{...root}}> 
        <li>
          <Tooltip title="Genres">
            <Chip label="Genres" sx={{...chip}} color="primary" />
          </Tooltip>
        </li>
        {(movie.genres || []).map((g) => (
          <li key={g.name}>
            <Tooltip title={`Genre: ${g.name}`}>
              <Chip label={g.name} sx={{...chip}} />
            </Tooltip>
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{...root}}>
        <Tooltip title={`Runtime: ${movie.runtime} minutes`}>
          <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        </Tooltip>
        <Tooltip title={`Revenue: $${movie.revenue.toLocaleString()}`}>
          <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
          />
        </Tooltip>
        <Tooltip title={`Rating: ${movie.vote_average} (${movie.vote_count})`}>
          <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count})`}
          />
        </Tooltip>
        <Tooltip title={`Released: ${movie.release_date}`}>
          <Chip label={`Released: ${movie.release_date}`} />
        </Tooltip>
      </Paper>

      <Paper component="ul" sx={{...root}}>
        <li>
          <Tooltip title="Production Countries">
            <Chip label="Production Countries" sx={{...chip}} color="primary" />
          </Tooltip>
        </li>
        {(movie.production_countries || []).map((c) => (
          <li key={c.name}>
            <Tooltip title={`Country: ${c.name}`}>
              <Chip label={c.name} sx={{...chip}} />
            </Tooltip>
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{...root}}>
        <li>
          <Tooltip title="Production Companies">
            <Chip label="Production Companies" sx={{...chip}} color="primary" />
          </Tooltip>
        </li>
          {(movie.production_companies || []).map((p) => (
            <li key={p.id || p.name}>
              <Tooltip title={`Company: ${p.name}`}>
                <Chip
                  avatar={p.logo_path ? <Avatar alt={p.name} src={`https://image.tmdb.org/t/p/w92${p.logo_path}`} /> : undefined}
                  label={p.name}
                  sx={{...chip}}
                />
              </Tooltip>
            </li>
          ))}
        </Paper>
      
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;
