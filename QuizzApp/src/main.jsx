import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import QuizLayout from './components/QuizLayout';
import ErrorPage from './components/ErrorPage';
import App from "./App";
import History from "./components/History"; // Import the History component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<QuizLayout />} />
      <Route path="history" element={<History />} /> {/* Added history route */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
