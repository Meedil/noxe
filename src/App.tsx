import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import DiscoverPage, { loader as dicoverLoader } from './routes/DiscoverPage';
import Home, {loader as homeLoader} from './routes/Home';
import Login from './routes/Login';
import MoviePage, { loader as moviePageLoader } from './routes/MoviePage';
import Root, { loader as rootLoader } from './routes/Root';



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
