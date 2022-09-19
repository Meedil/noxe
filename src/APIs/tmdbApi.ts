export const myKey = '63a755e9923c3c8f411ddebe7892197b';

export function getTrendingMovies(timeFrame:'week'|'day'='week'){
    return  fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${myKey}&append_to_response=credits,videos`, {method: 'GET'})
}

export function getImageURL(imagePath:string,widthString:string='original'){
    return `https://image.tmdb.org/t/p/${widthString}/${imagePath}`
}

export function getDetials(type:'movie'|'tv', id:number){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${myKey}&language=en-US`)
}

export function getDiscover(type:'movie'|'tv', page:number=1){
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${myKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`);
}

export function getCredits(type:'movie'|'tv', id:number){
    return fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${myKey}&language=en-US`)
}