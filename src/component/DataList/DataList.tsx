import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { MediaItem } from "../../store/movieSlice";

/**
 * To show list of all movies
 * @returns list of all movies or shows in card format
 */

const DataList = () => {
  const naviagte = useNavigate();
  const listData = useSelector<RootState>(
    (state) => state.movie.data
  ) as MediaItem[];

  /**
   *
   * @param item took item(movie or show) details
   * @used to set the media_type and naviagte
   * @returns naviagte the user to the details page
   */
  const handleShow = (item) => {
    console.log(item);
    localStorage.setItem("media_type", item.media_type);
    naviagte(`/${item.id}`);
  };

  /**
   *
   * @param item took item(movie or show) details
   * @used to set the media_type and naviagte
   * @returns naviagte the user to the details page
   */
  const handlePeople = (item) => {
    console.log("hii");
    naviagte(`/people/${item}`);
  };

  const noneImage = "/A9Roojb8irRKPyyhDKCRzVc16NI.jpg";

  return (
    <Container sx={{ maxWidth: "1500px !important" }}>
      <Grid2
        container
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        marginBottom={3}
      >
        {listData.length <= 0 && (
          <Box
            sx={{
              height: "40rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>No data found</h1>
          </Box>
        )}
        {listData?.map((item) => (
          <Grid2
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            onClick={
              item.id ? () => handleShow(item) : () => handlePeople(item)
            }
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ height: "22rem", width: "21.11rem" }}
                  image={`http://image.tmdb.org/t/p/w500${
                    item.backdrop_path || item.profile_path || noneImage
                  }`}
                  alt={item.title || item.name}
                />
              </CardActionArea>
              <CardActions sx={{ background: "black" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    direction={"column"}
                    justifyContent={"left !important"}
                  >
                    <Button
                      size="small"
                      color="primary"
                      sx={{ justifyContent: "left" }}
                    >
                      <Typography
                        variant="body2"
                        color="success.main"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {(item.title ?? item.name ?? "Unknown").length > 25
                          ? (item.title ?? item.name)?.slice(0, 20) + "..."
                          : item.title ?? item.name ?? "Unknown"}
                        {/* {(item.title || item.name||).length > 25
                          ? (item.title || item.name).slice(0, 20)
                          : item.title || item.name} */}
                      </Typography>
                    </Button>
                    <Button size="small" color="primary">
                      <Typography
                        variant="body2"
                        color="success.main"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Release Date <span> </span>
                        {item.release_date || item.first_air_date}
                      </Typography>
                    </Button>
                  </Stack>
                  <Avatar
                    sx={{
                      backgroundColor:
                        item?.vote_average && item.vote_average > 6
                          ? "green"
                          : item.vote_average
                          ? "orange"
                          : "red",
                    }}
                  >
                    {item?.vote_average?.toFixed(1)}
                  </Avatar>
                </Box>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default DataList;
