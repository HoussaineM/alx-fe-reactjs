import React from 'react';
import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();
  function navigateHome (){
    navigate("/");
  }
  const handleDelete = () => {
    deleteRecipe(recipeId);
  };

  return (
    <button onClick={()=> {handleDelete(); navigateHome();}}
    >
      Delete Recipe</button>
  );
};

export default DeleteRecipeButton;