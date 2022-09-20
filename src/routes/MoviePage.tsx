import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getDetials, getImageURL } from "../APIs/tmdbApi"
import './MoviePage.css'

export async function loader({params}){
    const details = getDetials(params.type, params.id);
    // console.log(details)
    return details;
}

export default function MoviePage (){
    const {credits, videos, ...pageData}:any = useLoaderData();
    const video = videos.results[0];

    const genres = pageData.genres.map(({id: genreId, name: genreName}) => {
        return <div key={genreId} className="d-inline-block me-1 mb-1 genre-block">{genreName}</div>
    });
    
    // console.log(pageData)
    const cast = credits.cast.filter((member, index) => index < 4).map((member)=>{
        return (
            <div className="cast-member">
                <div className="cast-member-img-crop mx-auto"><img className="cast-member-img" src={getImageURL(member.profile_path,'w500')} alt="" /></div>
                <div className="cast-member-name">{member.name}</div>
            </div>
        )
    });


    return(
        <div className="container">
            <div className="row">
                <div className="col-4"><img className="movie-poster" src={getImageURL(pageData.poster_path,  'original')} alt=""/></div>
                <div className="col">
                    <h1 className="title">{pageData.title ? pageData.title : pageData.name}</h1>
                    <div className="tagline mb-3 fs-4 subtext">{pageData.tagline}</div>
                    <div className="genres">{genres}</div>
                    <div className="my-2">
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">Release Date: {pageData.release_date}</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">Runtime: {pageData.runtime} mins</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">vote count: {pageData.vote_count}</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">vote average: {pageData.vote_average}</div>
                        <div className="fact-fields d-inline-block bg-dark py-1 px-2 mb-1 me-1">popularity: {pageData.popularity}</div>
                    </div>  
                    <p className="overview subtext">{pageData.overview}</p>
                    <div className="d-flex justify-content-around flex-wrap actors-container">{                    cast}</div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-lg-8 offset-lg-2 col-12">
                    <div className="fs-3 my-2">Latest Video</div>
                    <iframe className="yt-vid mx-auto" width="800" height="450" src={"https://www.youtube.com/embed/"+video.key} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}