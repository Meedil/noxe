import './Navbar.css'
import { Link, useNavigate, } from "react-router-dom";
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../App';

export default function Navbar(){
    const {currentUser, logout} = useContext(CurrentUserContext);
    const on = currentUser !== null;
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">Noxe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                {on && <><div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/discover/movie/1">Movies</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/discover/tv/1">
                            Tv Shows
                        </Link>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div className="nav-item">
                    <Link className='nav-link me-3 logout-link' to="/login" onClick={logout}>Logout</Link>
                </div>
                </div>
                </>}
            </div>
        </nav>
    )
}