import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import RecipeDetails from './components/RecipeDetails';
import Layout from './components/Layout.jsx';
import FavoritesList from './components/FavoritesList.jsx';
import RecommendationsList from './components/RecommendationsList.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<App />} />
      <Route path='recipes/:id' element={<RecipeDetails />} />
      <Route path='favorite' element={<FavoritesList/>}/>
      <Route path='recomandation' element={<RecommendationsList/>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)