import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store.tsx";
import { fetchEntityDetails } from "../../store/detailSlice.tsx";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { MovieCreationOutlined } from "@mui/icons-material"; // Fallback Icon
import RecomSimilar from "./RecomSimilar.tsx";
import CompanyProduction from "./CompanyProduction.tsx";
import { handleCastCrew } from "../../store/crewcastSlice.tsx";
import CastCrewAvtar from "./CastCrewAvtar.tsx";
import { handleReviews } from "../../store/reviewSlice.tsx";
import ReviewComponent from "./ReviewComponent.tsx";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>((state) => state.detail.details);
  const castCrew = useSelector<RootState>((state) => state.castCrew.details);
  const reviews = useSelector<RootState>((state) => state.review.details);

  useEffect(() => {
    let item_type = localStorage.getItem("media_type");

    item_type === "movie"
      ? dispatch(fetchEntityDetails({ id: id, type: "movie" }))
      : dispatch(fetchEntityDetails({ id: id, type: "tv" }));
    item_type === "movie"
      ? dispatch(handleCastCrew({ id: id, type: "movie" }))
      : dispatch(handleCastCrew({ id: id, type: "tv" }));
    item_type === "movie"
      ? dispatch(handleReviews({ id: id, type: "movie" }))
      : dispatch(handleReviews({ id: id, type: "tv" }));
  }, [id, dispatch]);

  return (
    <Box>
      {/* Background Section */}
      <Box
        sx={{
          background: data.backdrop_path
            ? `url(http://image.tmdb.org/t/p/w500${data.backdrop_path})`
            : "rgba(0, 0, 0, 0.5)", // Fallback background
          backgroundSize: data.backdrop_path ? "cover" : "contain",
          backgroundPosition: "center",
          height: { xs: "90%", md: "calc(100vh - 30vh)" },
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: data.backdrop_path ? "rgba(0, 0, 0, 0.5)" : "none",
          }}
        />

        <Container
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "space-between",
            gap: 3,
            paddingY: 4,
          }}
        >
          {/* Movie Poster */}
          <Card
            sx={{
              width: { xs: "100%", md: "30%" },
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data.poster_path ? (
              <CardMedia
                component="img"
                image={`http://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title || "Poster"}
                sx={{ width: "100%", height: "auto" }}
              />
            ) : (
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 2,
                }}
              >
                <MovieCreationOutlined
                  sx={{ fontSize: 48, color: "gray", marginBottom: 1 }}
                />
                <Typography variant="body1" color="text.secondary">
                  Poster Not Available
                </Typography>
              </CardContent>
            )}
          </Card>

          {/* Movie Details */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              alignSelf: "center",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: "white" }}
            >
              {data.title || data.name || "Title Not Available"}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: "white" }}>
              {data.overview || "Overview Not Available"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
            >
              Release Date: {data.release_date || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "white" }}
            >
              Rating: {data.vote_average ? `${data.vote_average} / 10` : "N/A"}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Additional Details */}
      <Container
        sx={{
          mt: { xs: "1rem", md: "3rem" },
          maxWidth: "1500px !important",
          mb: 3,
        }}
      >
        <CompanyProduction />
        <Divider
          sx={{
            borderBottomWidth: "thin",
            color: "#e1d6d6",
            borderColor: "rgb(255 255 255 / 87%)",
          }}
        />
        <CastCrewAvtar cast={castCrew.cast} title={"Cast"} />
        <Divider
          sx={{
            borderBottomWidth: "thin",
            color: "#e1d6d6",
            borderColor: "rgb(255 255 255 / 87%)",
          }}
        />
        <CastCrewAvtar cast={castCrew.crew} title={"Crew"} />
      </Container>
      <Divider
        sx={{
          borderBottomWidth: "thin",
          color: "#e1d6d6",
          borderColor: "rgb(255 255 255 / 87%)",
        }}
      />
      <RecomSimilar />
      <Box sx={{ backgroundColor: "#3c3c3c" }}>
        <ReviewComponent reviews={reviews} />
      </Box>
    </Box>
  );
};

export default DetailPage;
