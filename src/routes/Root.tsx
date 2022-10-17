/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../Components/Navbar";
import { Outlet, redirect, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../App";
import jwtDecode from "jwt-decode";

export function loader(){
    return redirect('home');
}

const localToken = localStorage.getItem('token');

export default function Root(){
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [currentUser, setCurrentUser] = useState(localToken && jwtDecode(localToken));
  
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('token');
        return <Navigate to='/login'/>
    }
    
    useEffect(() => {
        if(pathname === "/" || pathname === "/login"){
            navigate('home');
        }
    }, [])

    useEffect(() => {
        if(currentUser){
            navigate('home');
        }
    }, [currentUser])

    return(
    <div>
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser, logout}}>
            <Navbar />
            <Outlet/>
        </CurrentUserContext.Provider>
    </div>)
}