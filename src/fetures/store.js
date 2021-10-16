import { configureStore } from "@reduxjs/toolkit";
import moiviesReducer from "./movies/movieSlice"

export const store = configureStore ({
    reducer: moiviesReducer,
})