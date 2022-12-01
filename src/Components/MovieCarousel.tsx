import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../APIs/tmdbApi";

export default function MovieCarousel({moviesTrendingTodayResponse}){
    const [movieSlides, setMovieSlides] = useState();

    useEffect(() => {
        console.log('movies trending today: ', moviesTrendingTodayResponse)
        moviesTrendingTodayResponse.then(response => response.json()).then(movies => {
            console.log('response: ', movies);
            
            setMovieSlides(movies.results.map((movieDetails, index) => {
                return (
                <Link key={movieDetails.id} to={`/movieDetails/movie/${movieDetails.id}`}>
                    <div className={"carousel-item " + (index === 0 ? "active" : "")}>
                        <img src={getImageURL(movieDetails.backdrop_path, 'original')} className={"d-block w-100"} alt="..."/>
                        <div className="dark-bottom h-100 w-100 position-absolute top-0 start-0"></div>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{movieDetails.title}</h5>
                        </div>
                    </div>
                </Link>)
            }))
        })
    }, [])
    

    return(
        <div id="carouselExampleCaptions" className="carousel slide mb-md-5" data-bs-ride="false">
            <div className="carousel-inner w-sm-75 mx-auto">
                {movieSlides}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}