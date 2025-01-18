import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store.tsx";
import { fetchEntityDetails } from "../../store/detailSlice.tsx";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import RecomSimilar from "./RecomSimilar.tsx";
import CompanyProduction from "./CompanyProduction.tsx";
import { handleCastCrew } from "../../store/crewcastSlice.tsx";
import CastCrewAvtar from "./CastCrewAvtar.tsx";
import { handleReviews } from "../../store/reviewSlice.tsx";
import ReviewComponent from "./ReviewComponent.tsx";

/**
 *
 * @returns show movie details and similar and recommended movies
 */
const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>((state) => state.detail.details);
  const castCrew = useSelector<RootState>((state) => state.castCrew.details);
  const reviews = useSelector<RootState>((state) => state.review.details);
  let item_type = localStorage.getItem("media_type");
  // console.log(reviews);

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

  // console.log(data);

  return (
    <Box>
      <Box
        sx={{
          background: {
            xs: "none",
            md: `url(http://image.tmdb.org/t/p/w500${data.backdrop_path})`,
          },

          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // backgroundSize: "cover",
          // backgroundPosition: "cover",
          backgroundSize: { md: "cover" },
          backgroundPosition: { md: "cover" },
          // height: "calc(100vh - 30vh)",
          height: { xs: "90%", md: "calc(100vh - 30vh)" },

          //   color: "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            p: 0,
            top: { xs: 0, md: "calc(100px - 35px)" },
            left: 0,
            width: "100%",
            height: "inherit",
            backgroundColor: { xs: "none", md: "rgba(0, 0, 0, 0.5)" }, // 50% black opacity
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        {/* <Container>
          <Box>
            <Card>
              <CardMedia
                image={`http://image.tmdb.org/t/p/w500${data.poster_path}`}
                title="green iguana"
              />
            </Card>
          </Box>
        </Container> */}
        <Container
          sx={{
            position: "relative",
            zIndex: 2, // Ensure content is above the overlay
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "space-between",
            gap: 3,
            paddingY: 4,
          }}
        >
          {/* Left: Card with Movie Poster */}
          <Card
            sx={{
              width: { xs: "100%", md: "30%" },
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={`http://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              sx={{
                width: "100%",
                height: "auto",
              }}
            />
          </Card>

          {/* Right: Movie Details */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column ",
                justifyContent: "left",
                textAlign: "left",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ color: "white" }}
              >
                {data.title || data.name}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: "white" }}>
                {data.overview}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: "white" }}
              >
                Release Date: {data.release_date}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: "white" }}
              >
                Rating: {data.vote_average} / 10
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

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
