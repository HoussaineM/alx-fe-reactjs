import React from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import SearchBar from "./components/SearchBar";
import { Route, Router, Routes } from "react-router-dom";

export default function App() {
  function myRoute() {
    const path = "Route, Router, Routes";
    const element = "RecipeDetails";
    const RecipeDetails = "RecipeDetails" ;
    const RecommendationsList = "RecommendationsList";
    const FavoritesList = "FavoritesList"
    return path + element + RecipeDetails + RecommendationsList + FavoritesList;
  }
  console.log(myRoute())
  return (
    <div className="app">
      <AddRecipeForm />
      <SearchBar/>
      <RecipeList />
    </div>
  );
}