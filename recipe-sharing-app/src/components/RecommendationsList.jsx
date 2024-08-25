import React from 'react';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const  recommendations = useRecipeStore(state => state. recommendations);

  return (
    <div>
      <h2>My  recommendations</h2>
      { recommendations.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;