import { Link, useLoaderData, useLocation, useParams, useResolvedPath } from "react-router-dom"
import { getDiscover } from "../APIs/tmdbApi"
import MovieCard from "../Components/MovieCard";
import { CaretRightFill, CaretLeftFill } from "react-bootstrap-icons";

export async function loader({params}){
    return getDiscover(params.type, params.page)
}

export default function DiscoverPage(){
    const contentData:any = useLoaderData();
    const {type, page} = useParams();
    const location = useLocation();
    // console.log(location)
    
    const content = contentData.results.map((movieDetails) => {
        return(
            <div key={movieDetails.id} className="col-lg-2 col-md-3 col-4">
                <MovieCard movieId={movieDetails.id} moviePosterPath={movieDetails.poster_path} movieRating={movieDetails.vote_average} movieTitle={movieDetails.title !== undefined ? movieDetails.title : movieDetails.name} type={type}/>
            </div>)
    })

    const disablePrev = parseInt(page)===1;
    const disableNext = parseInt(page)===500;

    return(
        <div className="container">
            <div className="fs-4 mb-3">Discover Movies 
            <span className="float-end">
                <div className={'d-inline-block ' + (disablePrev?'disabled':'')}>
                    <Link to={!disablePrev ? `/discover/${type}/${parseInt(page)-1}` : ''} className={"prev-page d-inline-block"}><CaretLeftFill color={disablePrev?'#6c757d':'white'}/></Link>
                </div>
                Page <span className="subtext">{page}</span> / <Link to={`/discover/${type}/${contentData.total_pages}`}> {contentData.total_pages}</Link>
                <Link to={!disableNext ? `/discover/${type}/${parseInt(page)+1}` : ''} className="prev-page d-inline-block"><CaretRightFill color={disableNext?'#6c757d':'white'}/></Link>
            </span></div>
            <div className="row"></div>
            <div className="row">
                {content}
            </div>
        </div>
    )
}