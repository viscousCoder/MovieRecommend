import { Box, Container, Typography } from "@mui/material";
import React from "react";
import DataList from "../DataList/DataList.tsx";

/**
 *
 * @returns search bar result
 */
const SearchPage = () => {
  return (
    <Container>
      <Typography variant="h2">Results</Typography>
      <DataList />
    </Container>
  );
};

export default SearchPage;
