import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../common/constant.ts";
import axios from "axios";

// Centralize API request for reviews
const fetchReviews = async (id: string, type: "movie" | "tv") => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

const initialState = {
  loading: false,
  details: [],
  error: "",
};

// Create a single generalized async thunk for both movie and TV reviews
export const handleReviews = createAsyncThunk(
  "/reviews",
  async ({ id, type }: { id: string; type: "movie" | "tv" }) => {
    try {
      const data = await fetchReviews(id, type);
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Error fetching reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleReviews.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(handleReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
        state.error = "";
      })
      .addCase(handleReviews.rejected, (state, action) => {
        state.loading = false;
        state.details = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default reviewSlice.reducer;
