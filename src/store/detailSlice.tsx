import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../common/constant.ts";
import axios from "axios";

/**center api function for tv and mavie */
const fetchDetails = async (id: string, type: "movie" | "tv") => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

/**initial state */
const initialState = {
  loading: false,
  details: {},
  error: "",
};

/**api for tv an dmovie details */
export const fetchEntityDetails = createAsyncThunk(
  "/entityDetails",
  async ({ id, type }: { id: string; type: "movie" | "tv" }) => {
    try {
      const data = await fetchDetails(id, type);
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Error fetching details");
    }
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntityDetails.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchEntityDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
        state.error = "";
      })
      .addCase(fetchEntityDetails.rejected, (state, action) => {
        state.loading = false;
        state.details = {};
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default detailSlice.reducer;
