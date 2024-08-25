import React from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.filteredRecipes);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  function addMyFavorite(id) {
    addFavorite(id);
    generateRecommendations();
  }

  function removeMyFavorite(id) {
    removeFavorite(id);
    generateRecommendations();
  }

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/recipes/${recipe.id}`}>View Details</Link>
          <div>
            <button onClick={() => addMyFavorite(recipe.id)}>Add to favorarites</button>
            <button onClick={() => removeMyFavorite(recipe.id)}>Remove from favorites</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;