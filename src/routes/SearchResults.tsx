
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { getSearchResults } from "../APIs/tmdbApi"
import MovieCard from "../Components/MovieCard";

export async function loader({params}){
    const contentData = getSearchResults(params.searchText, params.pageNum);
    return contentData;
}

export default function SearchResults(){
    const contentData:any = useLoaderData();
    let {searchText, pageNum} = useParams();

    const disablePrev = parseInt(pageNum) === 1;
    const disableNext = parseInt(pageNum) >= contentData.total_pages;

    console.log(contentData.results);
    const content = contentData.results.filter((item) => item.gender === undefined).map((movieDetails) => {
        const type = movieDetails.title === undefined ? 'tv' : 'movie';
        return(
            <div className="col-lg-2 col-md-3 col-4" key={type+movieDetails.id}>
                <MovieCard movieId={movieDetails.id} moviePosterPath={movieDetails.poster_path} movieRating={movieDetails.vote_average} movieTitle={movieDetails.title !== undefined ? movieDetails.title : movieDetails.name} type={type}/>
            </div>)
    })

    return(
        <div className="container">
            <div className="fs-4 mb-3">Discover Movies 
            <span className="float-end">
                <div className={'d-inline-block ' + (disablePrev?'disabled':'')}>
                    <Link to={!disablePrev ? `/searchResults/${searchText}/${parseInt(pageNum)-1}` : ''} className={"prev-pageNum d-inline-block"}><CaretLeftFill color={disablePrev?'#6c757d':'white'}/></Link>
                </div>
                Page <span className="subtext">{pageNum}</span> / <Link to={`/searchResults/${searchText}/${contentData.total_pages}`}> {contentData.total_pages}</Link>
                <Link to={!disableNext ? `/searchResults/${searchText}/${parseInt(pageNum)+1}` : ''} className="prev-pageNum d-inline-block"><CaretRightFill color={disableNext?'#6c757d':'white'}/></Link>
            </span></div>
            <div className="row"></div>
            <div className="row">
                {content}
            </div>
        </div>
    )
}