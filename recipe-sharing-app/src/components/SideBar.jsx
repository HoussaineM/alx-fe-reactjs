import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const SideBar = () => {
    const id = useRecipeStore(state => state.recipes)
    return (
        <div className="sidebar">
            {id.map(recipe => <Link to={`/recipes/${recipe.id}`} key={recipe.id}>Ricipe {`#${id.indexOf(recipe) + 1}`}</Link> )}
        </div>
    );
}


export default SideBar;