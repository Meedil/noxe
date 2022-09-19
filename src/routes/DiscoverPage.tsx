import { useLoaderData } from "react-router-dom"
import { getDiscover } from "../APIs/tmdbApi"

export async function loader({params}){
    return getDiscover(params.type, params.page)
}

export default function DiscoverPage(){
    const contentData = useLoaderData();
    console.log(contentData)
    return(
        <></>
    )
}