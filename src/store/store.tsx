import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "./movieSlice.tsx";
import detailReducer from "./detailSlice.tsx";
import crewcastReducer from "./crewcastSlice.tsx";
import reviewReducer from "./reviewSlice.tsx";
export const store = configureStore({
  reducer: {
    movie: trendingReducer,
    detail: detailReducer,
    castCrew: crewcastReducer,
    review: reviewReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/**
 * store
 */
