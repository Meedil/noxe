import { Link } from "react-router-dom";
import { getImageURL } from "../APIs/tmdbApi";
import './MovieCard.css'

interface MovieCardProps {
    movieId:number,
    moviePosterPath:string,
    movieTitle:string,
    movieRating:number,
    type:string
}

export default function MovieCard({moviePosterPath, movieTitle, movieRating, movieId, type}:MovieCardProps){
    return(
        <Link to={`/movieDetails/${type}/${movieId}`}>
            <div className="card bg-transparent" >
                <img src={getImageURL(moviePosterPath)} className="card-img" alt="..."/>
                <div className="card-img-overlay rating-square">
                    {movieRating.toFixed(1)}
                </div>
                <div className="card-footer movie-card-footer">
                    <p className="card-title movie-card-title">{movieTitle}</p>
                </div>
            </div>
        </Link>
    )
}