import Navbar from "../Components/Navbar";
import { Outlet, redirect, useNavigate, useLocation } from "react-router-dom";
import { isTokenValid } from "../APIs/userApi";
import { useEffect } from "react";

export function loader(){
    return redirect('home');
}

export default function Root(){
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    useEffect(() => {
        if(pathname === "/"){
            navigate('home')
        }
    }, [])

    return(<div>
        <Navbar on={pathname!=="login"}/>
        <Outlet/>
    </div>)
}