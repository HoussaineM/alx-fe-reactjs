import React from 'react'
import RecipeDetail from './components/RecipeDetail'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from './components/HomePage'
import AddRecipeForm from './components/AddRecipeForm'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/addrecipe" element={<AddRecipeForm />} />
      </Routes>
    </Router>
  )
}

export default App