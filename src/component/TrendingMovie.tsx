import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Slider from "react-slick";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingMovie: React.FC = () => {
  const navigate = useNavigate();
  const trendingMovies = useSelector<RootState, any[]>(
    (state) => state.movie.data
  );

  const imagesPerPage = 5;

  const handleClick = (item: any) => {
    navigate(`/${item.id}`);
  };

  // Custom Next and Previous Arrow Components
  const NextArrow: React.FC<any> = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          right: "5px",
          zIndex: 2,
          transform: "translateY(-50%)",
          backgroundColor: "#65656587",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": { backgroundColor: "lightgray" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    );
  };

  const PrevArrow: React.FC<any> = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          left: "5px",
          zIndex: 2,
          transform: "translateY(-50%)",
          backgroundColor: "#65656587",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": { backgroundColor: "lightgray" },
        }}
      >
        <ArrowBackIos />
      </IconButton>
    );
  };

  const settings = {
    // infinite: true,
    slidesToShow: imagesPerPage,
    slidesToScroll: imagesPerPage,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

  return (
    <Box position="relative" width="100%">
      <Slider {...settings}>
        {trendingMovies?.map((item) => (
          <Box key={item.id} onClick={() => handleClick(item)} px={1}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://image.tmdb.org/t/p/w500${
                    item.backdrop_path || item.profile_path
                  }`}
                  alt={item.title || "Trending Movie"}
                />
                <CardContent
                  sx={{ background: "black", color: "white", p: "4px" }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    {item.title}||{item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TrendingMovie;
