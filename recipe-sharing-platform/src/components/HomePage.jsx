
import React, { useState, useEffect } from 'react';
import '../index.css';
import data from "../data.json"
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(data)
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Recipe Sharing Platform</h1>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map(recipe => (
                    <div key={recipe.id}>
                        <div

                            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl text-center"
                        >
                            <Link to={`recipe/${recipe.id}`} >
                                <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                                    <p className="text-gray-600">{recipe.summary}</p>
                                </div>
                            </Link>
                            <div className='flex gap-3 p-4'>
                                <Link to={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline">View Recipe</Link>
                                <Link to="/addrecipe" className="mx-auto text-blue-700 hover:text-blue-400 hover:underline">Recipe Form</Link>
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
};

export default HomePage;