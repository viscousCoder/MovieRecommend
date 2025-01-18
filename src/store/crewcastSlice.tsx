import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY } from "../common/constant.ts";
import axios from "axios";

/**center for tv api and movie api */
const fetchCastCrew = async (id: string, type: "movie" | "tv") => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

/**initial state */
const initialState = {
  loading: false,
  details: {},
  error: "",
};

/**calling the api */
export const handleCastCrew = createAsyncThunk(
  "/cast/crew",
  async ({ id, type }: { id: string; type: "movie" | "tv" }) => {
    try {
      const data = await fetchCastCrew(id, type);
      return data;
    } catch (error: any) {
      throw new Error(error.message || "Error fetching cast/crew");
    }
  }
);

const crewcastSlice = createSlice({
  name: "castCrew",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCastCrew.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(handleCastCrew.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
        state.error = "";
      })
      .addCase(handleCastCrew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default crewcastSlice.reducer;
