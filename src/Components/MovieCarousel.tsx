import { useEffect, useState } from "react";
import { getImageURL } from "../APIs/tmdbApi";

export default function MovieCarousel({moviesTrendingTodayResponse}){
    const [movieSlides, setMovieSlides] = useState();

    useEffect(() => {
        moviesTrendingTodayResponse.then(response => response.json()).then(movies => {
            console.log('response: ', movies);
            
            setMovieSlides(movies.results.map((movieDetails, index) => {
                return (
                <div key={movieDetails.id} className={"carousel-item " + (index === 0 ? "active" : "")}>
                    <img src={getImageURL(movieDetails.backdrop_path, 'original')} className={"d-block w-100 dark-bottom"} alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{movieDetails.title}</h5>
                    </div>
                </div>)
            }))
        })
    }, [])
    

    return(
        <div id="carouselExampleCaptions" className="carousel slide mb-5" data-bs-ride="false">
            <div className="carousel-inner w-75 mx-auto">
                {movieSlides}
                <div className="dark-bottom"></div>
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