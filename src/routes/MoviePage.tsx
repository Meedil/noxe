import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getCredits, getDetials, getImageURL } from "../APIs/tmdbApi"
import './MoviePage.css'

export async function loader({params}){
    const details = getDetials(params.type, params.id);
    const credits = getCredits(params.type, params.id);
    return {details, credits};
}

export default function MoviePage (){
    const {details:detailsResponse, credits:creditsResponse}:any = useLoaderData();
    const [pageData, setPageData] = useState<any>();
    const [cast, setCredits] = useState<any>();
    const [genres, setGenres] = useState<any>();
    useEffect(() => {
        console.log(detailsResponse)
        detailsResponse.then(response => response.json()).then(value => {
            setPageData(value);
            setGenres(value.genres.map(({id: genreId, name: genreName}) => {
                return <div key={genreId} className="d-inline-block me-1 mb-1 genre-block">{genreName}</div>
            }));
        });
        creditsResponse.then(response => response.json()).then(({cast}) => {
            setCredits(cast.filter((member, index) => index < 5));
        });
    }, [])

    return(
        <div className="container">
            <div className="row">
                <div className="col-4"><img className="movie-poster" src={pageData && getImageURL(pageData.poster_path)} alt=""/></div>
                <div className="col">
                    <h1 className="title">{pageData && (pageData.title ? pageData.title : pageData.name)}</h1>
                    <div className="tagline mb-3 fs-4">{pageData && pageData.tagline}</div>
                    <div className="genres">{pageData && genres}</div>
                    <div className="my-2">
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">Release Date: {pageData && pageData.release_date}</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">Runtime: {pageData && pageData.runtime} mins</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">vote count: {pageData && pageData.vote_count}</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">vote average: {pageData && pageData.vote_average}</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">popularity: {pageData && pageData.popularity}</div>
                    </div>
                    <p className="overview">{pageData && pageData.overview}</p>
                    <div className="d-flex justify-content-around flex-wrap actors-container">{cast !== undefined &&
                        cast.map((member)=>{
                            return (
                                <div className="cast-member">
                                    <div className="cast-member-img-crop mx-auto"><img className="cast-member-img" src={getImageURL(member.profile_path,'w500')} alt="" /></div>
                                    <div className="cast-member-name">{member.name}</div>
                                </div>
                            )
                        })}</div>
                </div>
            </div>
        </div>
    )
}