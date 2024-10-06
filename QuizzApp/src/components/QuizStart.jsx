import React, { useEffect, useState } from "react";
import { fetchCategory } from "../services/quizService";
import "../index.css";
import useQuizStore from "./QuizStore";
import { Link } from "react-router-dom";

export default function QuizStart() {
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizChoices = useQuizStore(state => state.setQuizChoices);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);
    const setMyQuiz = useQuizStore(state => state.setMyQuiz);
    const [quizCategories, setQuizCategories] = useState([]);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [choice, setChoice] = useState({
        difficulty: "medium",
        category: "9",
        number: 1, // Default value of 1 question
    });

    useEffect(() => {
        handleRequest();
    }, []);

    const handleRequest = async () => {
        setLoading(true);
        try {
            const categories = await fetchCategory();
            setQuizCategories(categories);
        } catch (error) {
            setLoadError("Failed to fetch quiz form! Please reload the page.");
        } finally {
            setLoading(false);
        }
    };

    function handleChange(e) {
        const { value, name } = e.target;
        const newValue = name === "number" ? parseInt(value, 10) : value;  // Ensure number input is parsed as an integer
        setChoice(prev => ({
            ...prev,
            [name]: newValue || ""  // Handle empty input for numbers
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = {};
        if (!choice.difficulty) errors.difficulty = "Difficulty is required";
        if (!choice.category) errors.category = "Category is required";
        if (!choice.number || isNaN(choice.number) || choice.number < 1 || choice.number > 20) {
            errors.number = "Number of questions must be between 1 and 20";  // Validation updated for range between 1 and 20
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            setMyQuiz([]);
            setQuizLoader(true);
            setQuizChoices(choice);
            setQuizState("quiz");
            setError({});
            setQuizCategories([]);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Quiz Start</h1>
            {loading && <p className="text-blue-500">Loading....</p>}
            {loadError && <p className="mt-4 text-red-500">{loadError}</p>}
            {quizCategories.length > 0 && (
                <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
                    <Link 
                        to="history" 
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4 inline-block text-center text-sm font-semibold transition-all"
                    >
                        History
                    </Link>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="category" className="block mb-2">Select quiz category</label>
                            <select
                                id="category"
                                value={choice.category}
                                name="category"
                                onChange={handleChange}
                                className={`w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error.category && "border-red-600"}`}
                            >
                                {quizCategories.map(item => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {error.category && <p className="text-red-600 mt-1">{error.category}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="difficulty" className="block mb-2">Select quiz difficulty</label>
                            <select
                                id="difficulty"
                                value={choice.difficulty}
                                name="difficulty"
                                onChange={handleChange}
                                className={`w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error.difficulty && "border-red-600"}`}
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            {error.difficulty && <p className="text-red-600 mt-1">{error.difficulty}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="number" className="block mb-2">Select number of Questions</label>
                            <input
                                id="number"
                                type="number"
                                value={choice.number}
                                name="number"
                                onChange={handleChange}
                                placeholder="Number of questions"
                                min="1"  // Minimum value set to 1
                                max="20"  // Maximum value set to 20
                                className={`w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error.number && "border-red-600"}`}
                            />
                            {error.number && <p className="text-red-600 mt-1">{error.number}</p>}
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded text-white transition-all"
                        >
                            Start quiz
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
