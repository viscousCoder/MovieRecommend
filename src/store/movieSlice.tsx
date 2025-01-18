import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN_TMDB } from "../common/constant.ts";

const token = TOKEN_TMDB;

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const initialState = {
  loading: false,
  data: [],
  error: "",
};

/** Generic Thunk Creator */
const createThunk = (type: string, url: string) =>
  createAsyncThunk(type, async (payload?: any) => {
    try {
      const response = await apiClient.get(
        typeof url === "function" ? url(payload) : url
      );
      return response.data.results;
    } catch (error: any) {
      throw new Error(error.message || "Request failed");
    }
  });

/** All API Endpoints */

/**Get all treding movies and shows */
export const allMoviesAndShow = createThunk(
  "/all",
  `/trending/all/day?language=en-US`
);

/**Get all trending movies */
export const trendingMovie = createThunk(
  "/trending",
  `/trending/movie/day?language=en-US`
);

// export const handlePeople = createThunk(
//   "/people",
//   `/trending/person/day?language=en-US`
// );

/**Get all trending shows */
export const handleTv = createThunk("/tv", `/trending/tv/day?language=en-US`);

/**Get recommended movies */
export const handleRecommend = createThunk(
  "/recommend",
  (id: string) => `/movie/${id}/recommendations?language=en-US&page=1`
);

/**Get similar movies */
export const handleSimilar = createThunk(
  "/similar",
  (id: string) => `/movie/${id}/similar?language=en-US&page=1`
);

/**Get recommended shows */
export const handleRecommendTvShow = createThunk(
  "/recommend/tv",
  (id: string) => `/tv/${id}/recommendations?language=en-US&page=1`
);

/**Get similar shows */
export const handleSimilarTvShow = createThunk(
  "/similar/tv",
  (id: string) => `/tv/${id}/similar?language=en-US&page=1`
);

/**Get search data */
export const handleSearchBar = createThunk(
  "/searchBar",
  (query: string) =>
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
);

/** Utility Function to Add Cases */
const addAsyncCases = (builder: any, asyncThunk: any) => {
  builder
    .addCase(asyncThunk.pending, (state: any) => {
      state.loading = true;
      state.error = "";
      state.data = [];
    })
    .addCase(asyncThunk.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    })
    .addCase(asyncThunk.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
      state.data = [];
    });
};

export const trendingMovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncCases(builder, allMoviesAndShow);
    addAsyncCases(builder, trendingMovie);
    // addAsyncCases(builder, handlePeople);
    addAsyncCases(builder, handleTv);
    addAsyncCases(builder, handleRecommend);
    addAsyncCases(builder, handleSimilar);
    addAsyncCases(builder, handleRecommendTvShow);
    addAsyncCases(builder, handleSimilarTvShow);
    addAsyncCases(builder, handleSearchBar);
  },
});

export default trendingMovieSlice.reducer;
