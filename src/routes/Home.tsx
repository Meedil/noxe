import { isTokenValid } from "../APIs/userApi"
import "./Home.css"
import { redirect, useLoaderData } from "react-router-dom"
import { myKey } from "../APIs/tmdbApi"
import { ReactElement, useEffect, useState } from "react"
import MovieCard from "../Components/MovieCard"
import MovieCarousel from "../Components/MovieCarousel"
import axios from "axios"

export async function loader() {
    const moviesTrendingToday = fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${myKey}`, {method: 'GET'});
    const moviesTrendingThisWeek = fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${myKey}`, {method: 'GET'});
    const showsTrendingThisWeek = fetch(
        `http://api.themoviedb.org/3/trending/tv/week?api_key=${myKey}&language=en-US`, {method: 'GET'});

    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${myKey}`).then((response) => console.log(response))
    return {watchNowMovies: moviesTrendingThisWeek, watchNowShows: showsTrendingThisWeek, moviesTrendingToday}
}

export default function Home(){
    const {watchNowMovies: moviesResponseWeek, watchNowShows: showsResponse, moviesTrendingToday: moviesResponseDay}:any = useLoaderData();
    const [movieCards, setMovieCards] = useState<any[]>();
    const [showCards, setShowCards] = useState<any[]>();


    useEffect(()=>{
        moviesResponseWeek.then(response=>
            response.json()
            ).then((shows:any) => {
                setMovieCards(shows.results.filter((movieDetails, index) => index < 10).map((movieDetails, index)=>{
                    // console.log(movieDetails)
                    return <div className={"col-4 col-md-3 col-lg-2 "} key={movieDetails.id}>
                    <MovieCard movieId={movieDetails.id} moviePosterPath={movieDetails.poster_path} movieTitle={movieDetails.title} movieRating={movieDetails.vote_average} type="movie"/>
                </div>
            }));});
        showsResponse.then((response)=>
            response.json()
        ).then((shows)=> {
            setShowCards(
                shows.results.filter((showDetails, index) => index < 10).map((showDetails) => {
                    return <div className="col-4 col-md-3 col-lg-2" key={showDetails.id}>
                        <MovieCard movieId={showDetails.id} moviePosterPath={showDetails.poster_path} movieTitle={showDetails.name} movieRating={showDetails.vote_average} type="tv"/>
                    </div>
                })
            )
        });
    }, [])


    return (
        <div>
            <div className="container">
                <div className="row">
                    <MovieCarousel moviesTrendingTodayResponse={moviesResponseDay}/>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-3 col-lg-4">
                        <hr className="w-25"/>
                        <div className="row-heading">
                            <h2 >Trending Movies to Watch Now</h2>
                            <div className="display-6 fs-6 row-info subtext">Most watched movies last 2 weeks</div>
                        </div>
                        <hr />
                    </div>
                    {movieCards}
                </div>
                <div className="row align-items-center">
                    <div className="col-md-3 col-lg-4">
                        <hr className="w-25"/>
                        <div className="row-heading">
                            <h2 >Trending Movies to Watch Now</h2>
                            <div className="display-6 fs-6 row-info">Most watched movies last 2 weeks</div>
                        </div>
                        <hr />
                    </div>
                    {showCards}
                </div>
            </div>
        </div>
    )
}