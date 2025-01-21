import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  CircularProgress,
  Container,
  Tab,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store.tsx";
import DataList from "../DataList/DataList.tsx";
import {
  handleRecommend,
  handleRecommendTvShow,
  handleSimilar,
  handleSimilarTvShow,
} from "../../store/movieSlice.tsx";

/**
 * @returns similar and recommended movie as per the user request
 */
const RecomSimilar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = React.useState("recommend");
  const isLoading = useSelector<RootState, any[]>(
    (state) => state.movie?.loading
  );

  /**set the values of tabs */
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  /**navigate to the details page of that movie */
  const handleClick = () => {
    navigate("/trending");
  };

  useEffect(() => {
    let data_type = localStorage.getItem("media_type");

    if (value === "recommend") {
      data_type === "movie"
        ? dispatch(handleRecommend(id))
        : dispatch(handleRecommendTvShow(id));
    }
    if (value === "similar") {
      data_type === "movie"
        ? dispatch(handleSimilar(id))
        : dispatch(handleSimilarTvShow(id));
    }
  }, [value, id, dispatch]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            background: "#000000a3",
            justifyContent: "center",
            top: 0,
            left: 0,
            zIndex: 9999,
            height: "100vh",
            position: "absolute",
            width: " 100%",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{ maxWidth: "1500px !important" }}>
          <Box sx={{ width: "100%", typography: "body1", color: "white" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{ color: "white" }}
                >
                  <Tab
                    label="Recommended"
                    value="recommend"
                    sx={{ color: "white !important" }}
                  />
                  <Tab
                    label="Similar"
                    value="similar"
                    sx={{ color: "white !important" }}
                  />
                </TabList>
                <Typography variant="body2" onClick={handleClick}>
                  See all
                </Typography>
              </Box>
              <TabPanel value="recommend"></TabPanel>
              <TabPanel value="similar"></TabPanel>
            </TabContext>
          </Box>
          <Box sx={{ height: "100%", overflow: "hidden" }}>
            <DataList />
          </Box>
        </Container>
      )}
    </>
  );
};

export default RecomSimilar;
