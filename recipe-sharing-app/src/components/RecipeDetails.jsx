import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id === parseInt(id)));
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  if (!recipe) return <div>Recipe not found!</div>;
  function addMyFavorite(id) {
    addFavorite(id);
    generateRecommendations();
  }

  function removeMyFavorite(id) {
    removeFavorite(id);
    generateRecommendations();
  }

  return (
    <div className='edit-recipe'>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
      <Link to="/">Back to Home</Link>
      <div>
        <button onClick={() => addMyFavorite(recipe.id)}>Add to favorarites</button>
        <button onClick={() => removeMyFavorite(recipe.id)}>Remove from favorites</button>
      </div>
    </div>
  );
};

export default RecipeDetails;