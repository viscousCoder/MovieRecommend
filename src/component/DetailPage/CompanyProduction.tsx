import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

/**
 *
 * @returns show comapny name and some details
 */
const CompanyProduction: React.FC = () => {
  const data = useSelector<RootState, any>((state) => state.detail.details);
  const companies = data?.production_companies || [];

  return (
    <Box sx={{ padding: "16px", background: "#3c3c3c" }}>
      {/* Movie Information */}
      {/* <Card sx={{ marginBottom: "24px", backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h3" gutterBottom textAlign="center">
            {data.title}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            color="text.secondary"
          >
            {data.tagline}
          </Typography>
          <Typography variant="body1" textAlign="center" gutterBottom>
            {data.overview}
          </Typography>
        </CardContent>
      </Card> */}

      {/* Production Companies */}
      <Box marginBottom={4}>
        <Typography variant="h4" gutterBottom>
          Production Companies
        </Typography>
        <Grid container spacing={2}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "#4c4c4c",
                }}
              >
                <Avatar
                  src={
                    company.logo_path
                      ? `http://image.tmdb.org/t/p/w500${company.logo_path}`
                      : undefined
                  }
                  alt={company.name}
                  sx={{
                    width: 64,
                    height: 64,
                    marginRight: "16px",
                    backgroundColor: "orange",
                    fontSize: "20px",
                  }}
                >
                  {!company.logo_path && company.name.charAt(0)}
                </Avatar>
                <Typography variant="h6">{company.name}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Additional Details */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          backgroundColor: "#3c3c3c",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Box>
          <Typography variant="h6">Release Date:</Typography>
          <Typography variant="body1">{data.release_date}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Genres:</Typography>
          <Typography variant="body1">
            {data.genres?.map((genre, index) => (
              <span key={genre.id}>
                {genre.name}
                {index < data.genres.length - 1 && ", "}
              </span>
            ))}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">Runtime:</Typography>
          <Typography variant="body1">{data.runtime} minutes</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Languages:</Typography>
          <Typography variant="body1">
            {data.spoken_languages?.map((lang, index) => (
              <span key={lang.iso_639_1}>
                {lang.english_name}
                {index < data.spoken_languages.length - 1 && ", "}
              </span>
            ))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyProduction;
