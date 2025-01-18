import { Box } from "@mui/material";
import React, { Fragment } from "react";
import HomeComponent from "../component/HomeComponent.tsx";
import TrendingMovie from "../component/TrendingMovie.tsx";
import TopCarosuel from "../component/Header/TopCarosuel.tsx";

/**Home page */
const HomePage = () => {
  return (
    <Fragment>
      <TopCarosuel />
      <HomeComponent />
    </Fragment>
  );
};

export default HomePage;
