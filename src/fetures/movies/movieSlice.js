import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/MovieApi"
import { APIKey } from "../../common/apis/MovieApiKey"

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async () => {
    const movieText = "harry";
    const response = await movieApi
        .get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)

    return response.data
})

export const fetchAsyncShows = createAsyncThunk("movies/fetchAsyncShows", async () => {
    const seriesText = "Friends";
    const response = await movieApi
        .get(`?apiKey=${APIKey}&s=${seriesText}&type=series`)

    return response.data
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieOrShowDetail",
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
        return response.data;
    });

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("fulfilled");
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("fulfilled");
            return { ...state, shows: payload }
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, selectMovieOrShow: payload };
        },
    }
})

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer