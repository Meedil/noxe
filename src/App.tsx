import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom';
import './App.css';
import ForbidIfNotLoggedIn from './Components/ForbidIfNotLoggedIn';

import DiscoverPage, { loader as dicoverLoader } from './Routes/DiscoverPage';
import Home, {loader as homeLoader} from './Routes/Home';
import Login from './Routes/Login';
import MoviePage, { loader as moviePageLoader } from './Routes/MoviePage';
import Register from './Routes/Register';
import Root from './Routes/Root';
import SearchResults, { loader as searchLoader } from './Routes/SearchResults';


export const CurrentUserContext = createContext(null);

const router = createBrowserRouter([{
    path: '/',
    element: <Root/>,
    children:[{
      path: 'login',
      element: <Login />
    },{
      path: 'register',
      element: <Register />
    },{
      path:'home',
      element:<ForbidIfNotLoggedIn>
        <Home />
      </ForbidIfNotLoggedIn>,
      loader: homeLoader
    },{
      path: 'movieDetails/:type/:id',
      element: <ForbidIfNotLoggedIn>
        <MoviePage />
      </ForbidIfNotLoggedIn>,
      loader: moviePageLoader,
   },{
      path: 'discover/:type/:page',
      element: <ForbidIfNotLoggedIn>
        <DiscoverPage />
      </ForbidIfNotLoggedIn>,
      loader: dicoverLoader
   },{
      path: 'searchResults/:searchText/:pageNum',
      element: <ForbidIfNotLoggedIn>
        <SearchResults />
      </ForbidIfNotLoggedIn>,
      loader: searchLoader
   }],
  }]
)

function App() {
  return (
     <RouterProvider
          router={router}
      />
  );
}

export default App;
