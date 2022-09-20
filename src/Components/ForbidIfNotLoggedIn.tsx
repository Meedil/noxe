import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";

export default function ForbidIfNotLoggedIn(props){
    const {currentUser} = useContext(CurrentUserContext);
    const navigate = useNavigate(); 

    if(!currentUser){
        return <Navigate to="/login"/>
    }
    return(
        <>
            {props.children}
        </>
    )
}