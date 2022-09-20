import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import DiscoverPage, { loader as dicoverLoader } from './Routes/DiscoverPage';
import Home, {loader as homeLoader} from './Routes/Home';
import Login from './Routes/Login';
import MoviePage, { loader as moviePageLoader } from './Routes/MoviePage';
import Root from './Routes/Root';
import SearchResults, { loader as searchLoader } from './Routes/SearchResults';



const router = createBrowserRouter([{
    path: '/',
    element: <Root/>,
    children:[{
      path: 'login',
      element: <Login />
    },{
      path:'home',
      element:<Home />,
      loader: homeLoader
    },{
      path: 'movieDetails/:type/:id',
      element: <MoviePage />,
      loader: moviePageLoader,
   },{
      path: 'discover/:type/:page',
      element: <DiscoverPage />,
      loader: dicoverLoader
   },{
      path: 'searchResults/:searchText/:pageNum',
      element: <SearchResults />,
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
