import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const foundRecipe = data.find(recipe => recipe.id === parseInt(id));
        setRecipe(foundRecipe);
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4 sm:max-w-sm md:max-w-md lg:max-w-2xl text-center">
            <div className="border rounded-lg overflow-hidden shadow-md transition-transform duration-500 hover:scale-105 cursor-pointer">
                <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
                    <p className="text-gray-700 mb-4">{recipe.summary}</p>
                    {/* Add additional details like ingredients and instructions here */}
                </div>
                <Link to="/" className="mx-auto text-blue-700 hover:text-blue-400 hover:underline">Back to Home</Link>
            </div>
        </div>
    );
};

export default RecipeDetail;