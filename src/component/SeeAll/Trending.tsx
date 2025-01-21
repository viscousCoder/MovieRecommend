import React, { useEffect } from "react";
import TopCarousel from "../Header/TopCarosuel.tsx";
import MoviesPage from "./MoviePage.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { trendingMovie } from "../../store/movieSlice.tsx";

const Trending = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(trendingMovie());
  }, [dispatch]);
  return (
    <>
      <TopCarousel />
      {/* <Container> */}
      <MoviesPage />
      {/* </Container> */}
    </>
  );
};

export default Trending;
