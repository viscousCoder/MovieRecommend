import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.tsx";
import {
  allMoviesAndShow,
  handleTv,
  trendingMovie,
} from "../store/movieSlice.tsx";
import { Box, Container, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate } from "react-router-dom";
import DataList from "./DataList/DataList.tsx";
import Loading from "./Loading/Loading.tsx";

const HomeComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = React.useState("all");
  const trendingMovies = useSelector<RootState, any[]>(
    (state) => state.movie?.loading
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === "all") dispatch(allMoviesAndShow());
    if (value === "movie") dispatch(trendingMovie());
    if (value === "tv") dispatch(handleTv());
  }, [value, dispatch]);

  const handleClick = () => {
    navigate("/trending");
  };

  return (
    <Fragment>
      {trendingMovies ? (
        // <Box
        //   sx={{
        //     display: "flex",
        //     background: "#000000a3",
        //     justifyContent: "center",
        //     top: 0,
        //     left: 0,
        //     zIndex: 9999,
        //     height: "100vh",
        //     position: "absolute",
        //     width: " 100%",
        //     alignItems: "center",
        //   }}
        // >
        //   <CircularProgress />
        // </Box>
        <Loading />
      ) : (
        <Container
          sx={{ maxWidth: "1500px !important", mt: { xs: 3, md: 10 } }}
        >
          <Typography variant="h4" sx={{ fontWeight: "900" }}>
            Trending
          </Typography>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  borderBottomWidth: "thin",
                  color: "#e1d6d6",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="All" value="all" sx={{ color: "#fff" }} />
                  <Tab label="Movie" value="movie" sx={{ color: "#fff" }} />

                  <Tab label="TV" value="tv" sx={{ color: "#fff" }} />
                </TabList>
                <Typography
                  variant="body2"
                  onClick={handleClick}
                  sx={{ cursor: "pointer" }}
                >
                  See all
                </Typography>
              </Box>
              <TabPanel value="all"></TabPanel>
              <TabPanel value="movie"></TabPanel>
              <TabPanel value="tv"></TabPanel>
            </TabContext>
          </Box>
          <Box sx={{ height: "100%", overflow: "hidden", minHeight: "70%" }}>
            {/* <TrendingMovie /> */}
            <DataList />
          </Box>
        </Container>
      )}
    </Fragment>
  );
};

export default HomeComponent;
