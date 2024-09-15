import React, { useState, useEffect } from "react";
import data from "../data.json"
import { Link } from "react-router-dom";

const AddRecipeForm = () => {
    const [recipe, setRecipe] = useState({
        title: "",
        image: "",
        summary: "",
        ingredients: "",
        steps: ""

    })

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            alert("Recipe added successfully!")
            let timer = setTimeout(() => {
                setIsSubmitted(false);
            }, 4000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [isSubmitted])


    function handleChange(e) {
        const validate = e.target.value;
        const { value, name } = e.target;

        setRecipe(prevRecipe => (
            {
                ...prevRecipe,
                [name]: value,
            }
        ))

    }

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};

        // Basic validation
        if (!recipe.title) newErrors.title = 'Title is required';
        if (!recipe.ingredients || recipe.ingredients.split('\n').length < 2) newErrors.ingredients = 'Please provide at least two ingredients';
        if (!recipe.steps) newErrors.steps = 'Instructions are required';
        if (!recipe.image) newErrors.image = 'Image url is required';
        if (!recipe.summary) newErrors.summary = 'Summary is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitted(false);
        } else {
            const recipeId = data.length + 1;
            data.push({ ...recipe, id: recipeId });
            // Handle successful submission (e.g., post data to an API)
            console.log(recipe);
            setErrors({});
            setIsSubmitted(true);
            setRecipe({
                title: "",
                image: "",
                summary: "",
                ingredients: "",
                steps: ""

            });
        }
    }


    return (
        <div>
            <div className="p-4 max-w-md mx-auto">
                <Link to="/" className="mx-auto text-blue-700 hover:text-blue-400 hover:underline">Back to Home</Link>
                <h2 className="text-2xl text-center font-bold mb-4">Add a New Recipe</h2>
                {isSubmitted && (
                    <div className="bg-green-100 border border-green-500 text-green-700 p-2 rounded mb-4">
                        Recipe added successfully!
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4 shadow-xl hover:shadow-2xl">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Title</label>
                        <input
                            id="title"
                            type="text"
                            value={recipe.title}
                            name="title"
                            onChange={handleChange}
                            placeholder="Enter recipe title"
                            className={`mt-1 block w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Recipe Image</label>
                        <input
                            id="image"
                            type="text"
                            value={recipe.image}
                            name="image"
                            onChange={handleChange}
                            placeholder="Insert Image url"
                            className={`mt-1 block w-full p-2 border rounded ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                    </div>
                    <div>
                        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Recipe Summary</label>
                        <input
                            id="summary"
                            type="text"
                            value={recipe.summary}
                            name="summary"
                            onChange={handleChange}
                            placeholder="Insert summary"
                            className={`mt-1 block w-full p-2 border rounded ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                    </div>
                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
                        <textarea
                            id="ingredients"
                            value={recipe.ingredients}
                            name="ingredients"
                            onChange={handleChange}

                            placeholder="List ingredients, one per line"
                            rows="4"
                            className={`mt-1 block w-full p-2 border rounded ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                    </div>
                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
                        <textarea
                            id="instructions"
                            value={recipe.steps}
                            name="steps"
                            onChange={handleChange}

                            placeholder="Describe the preparation steps"
                            rows="6"
                            className={`mt-1 block w-full p-2 border rounded ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Recipe
                    </button>
                </form>
            </div>


        </div>
    );
}

export default AddRecipeForm;