import React from "react";
import { Box, Card, CardMedia, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  likes: string;
  promoted: boolean;
  rating: string;
  poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

/**
 *
 * @param param0 movie details
 * @returns return the card of the movie
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigate = (movie) => {
    localStorage.setItem("media_type", movie.media_type);
    navigate(`/${movie.id}`);
  };
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => handleNavigate(movie)}
    >
      <CardMedia
        component="img"
        height="250"
        image={`http://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      <Box p={2} flexGrow={1} sx={{ background: "black", color: "white" }}>
        <Typography variant="subtitle1">{movie.title}</Typography>

        <Typography variant="body2" color="success.main">
          {movie?.popularity}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {movie?.vote_count}
        </Typography>
      </Box>
    </Card>
  );
};

export default MovieCard;
