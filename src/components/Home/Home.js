import React, {useEffect} from 'react';
import { useDispatch } from "react-redux";

import movieApi from "../../common/apis/MovieApi"
import { APIKey } from "../../common/apis/MovieApiKey"
import { addMovies } from '../../fetures/movies/movieSlice';
import MovieListing from '../MovieListing/MovieListing';

const Home = () => {
    const movieText = "harry";
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMoive = async () => {
        const response = await movieApi
        .get(
            `?apiKey=${APIKey}&s=${movieText}&type=movie`
        )
        .catch((err) => {
            console.log("err:", err);
        })
        dispatch(addMovies(response.data))
    }
    fetchMoive();
    })
    return (
        <div>
        <div className="banner-img"></div>
        <MovieListing />
      </div>
    );
};

export default Home;