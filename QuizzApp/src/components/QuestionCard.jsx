import React, { useEffect, useState } from "react";
import useQuizStore from "./QuizStore";
import { fetchQuestions } from "../Services/quizService";
import "../index.css";

export default function QuestionCard() {
    // State and methods retrieved from Zustand store
    const fetchChoices = useQuizStore(state => state.quizChoices); // Fetch user-selected quiz choices
    const setQuizState = useQuizStore(state => state.setQuizState); // To change the quiz state, e.g., to move to score display
    const setQuizScore = useQuizStore(state => state.setQuizScore); // Store the final quiz score
    const myQuiz = useQuizStore(state => state.myQuiz); // Contains the quiz questions
    const setMyQuiz = useQuizStore(state => state.setMyQuiz); // Update the quiz questions
    const setQuizHistory = useQuizStore(state => state.setQuizHistory); // Store quiz history
    const quizLoader = useQuizStore(state => state.quizLoader); // Boolean to check if quiz is loading

    // Local state for managing current quiz state
    const [currentQuestion, setCurrentQuestion] = useState({}); // Holds the current question object
    const [answerOptions, setAnswerOptions] = useState([]); // Array for answer choices of the current question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks which question the user is on
    const [currentAnswer, setCurrentAnswer] = useState(""); // Holds the selected answer
    const [countTime, setCountTime] = useState(0); // Tracks the time spent per quiz
    const [time, setTime] = useState({}); // Object to store hours, minutes, and seconds
    const [score, setScore] = useState(0); // Tracks the user's score
    const [loading, setLoading] = useState(false); // Handles loading state
    const [loadError, setLoadError] = useState(""); // Error handling for loading quiz

    // Fetch quiz questions when quiz loader is active
    useEffect(() => {
        if (quizLoader) {
            handleFetch(); // Calls API to fetch quiz questions
        }
    }, []);

    // Handles timer for each question
    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            handleTime(countTime); // Updates the timer
            let timer = setTimeout(() => {
                setCountTime(countTime + 1);
            }, 1000);
            return () => clearTimeout(timer); // Clears timeout to avoid memory leaks
        }
    }, [myQuiz, countTime]);

    // Moves to the score page when the quiz is completed
    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex === myQuiz.length) {
            myHistory(); // Store quiz result history
            setQuizHistory(); // Set quiz history in the state
            setQuizState("score"); // Change quiz state to show the score
        }
    }, [currentQuestionIndex]);

    // Updates the current question based on the index
    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            setCurrentQuestion(myQuiz[currentQuestionIndex]);
        }
    }, [myQuiz, currentQuestionIndex]);

    // Randomizes the answer options and sets them for the current question
    useEffect(() => {
        if (Object.keys(currentQuestion).length > 0) {
            const randomAnswer = currentQuestion.correct_answer;
            const currentChoices = [...currentQuestion.incorrect_answers];
            const randomPosition = Math.floor(Math.random() * (currentChoices.length + 1));
            currentChoices.splice(randomPosition, 0, randomAnswer); // Insert correct answer randomly
            setAnswerOptions(currentChoices); // Set shuffled answer options
        }
    }, [currentQuestion]);

    // Fetch quiz questions from API
    const handleFetch = async () => {
        setLoading(true); // Set loading state to true while fetching data
        const amount = fetchChoices.number; // Number of questions chosen by the user
        const difficulty = fetchChoices.difficulty; // Difficulty level chosen by the user
        const category = fetchChoices.category; // Category chosen by the user
        try {
            const results = await fetchQuestions(amount, category, difficulty); // API call to fetch quiz questions
            setMyQuiz(results); // Store the quiz data
        } catch (error) {
            setLoadError("Failed to fetch questions."); // Handle error if fetching fails
        } finally {
            setLoading(false); // Stop the loading state once fetching is done
        }
    };

    // Handle when user selects an answer
    function handleAnswer(answer) {
        setCurrentAnswer(answer); // Update current selected answer
    }

    // Store quiz results in quiz history
    function myHistory() {
        const topicCategory = currentQuestion.category; // Get quiz category
        const topicLevel = currentQuestion.difficulty; // Get quiz difficulty level
        const str = topicLevel.charAt(0).toUpperCase() + topicLevel.slice(1).toLowerCase(); // Format difficulty string
        const topicId = Date.now(); // Unique ID for quiz session based on timestamp
        const d = new Date(topicId); 
        const stringDate = d.toString(); // Convert date to string
        const correctResponses = score; // Store correct answers count
        const totalQuestions = myQuiz.length; // Total number of questions
        const topicScore = parseInt((correctResponses / totalQuestions) * 100); // Calculate percentage score
        const topicResults = {
            id: topicId,
            topic: topicCategory,
            level: str,
            correct: correctResponses,
            questions: totalQuestions,
            scored: topicScore,
            spent: time, // Time spent on the quiz
            date: stringDate,
        };
        setQuizScore(topicResults); // Store quiz score in the global state
    }

    // Timer function to track time spent on each question
    function handleTime(currenttime) {
        let s = currenttime % 60;
        let m = parseInt(currenttime / 60) % 60;
        let h = parseInt(currenttime / 3600);
        const sec = s < 10 ? `0${s}` : s;
        const min = m < 10 ? `0${m}` : m;
        const hr = h < 10 ? `0${h}` : h;
        const timeValue = {
            hours: hr,
            minutes: min,
            seconds: sec
        };
        setTime(timeValue); // Update time state
    }

    // Handle form submission to go to the next question
    function handleSubmit(e) {
        e.preventDefault();
        if (currentQuestionIndex < myQuiz.length) {
            const correctAnswer = currentQuestion.correct_answer;
            if (currentAnswer === correctAnswer) {
                setScore(score + 1); // Increment score if the answer is correct
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            {loading && <p className="text-blue-500">Loading questions...</p>}
            {loadError && !Object.keys(currentQuestion).length > 0 && (
                <p className="text-red-500">{loadError}</p> // Display error if questions fail to load
            )}
            {Object.keys(currentQuestion).length > 0 && (
                <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-4">
                        Question: {myQuiz.indexOf(currentQuestion) + 1}/{myQuiz.length}
                    </h2>
                    <h3 className="mb-6">{currentQuestion.question}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                        {answerOptions.map(answer => (
                            <label
                                key={answer}
                                className={`block w-full p-2 rounded cursor-pointer ${
                                    currentAnswer === answer
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                            >
                                <input
                                    id={answer}
                                    type="radio"
                                    name="choose"
                                    value={answer}
                                    checked={currentAnswer === answer}
                                    onChange={() => handleAnswer(answer)}
                                    className="mr-2"
                                />
                                {answer}
                            </label>
                        ))}
                        <button
                            type="submit"
                            className={`w-full py-2 mt-4 rounded text-white transition-all ${
                                currentAnswer !== ""
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-600 cursor-not-allowed"
                            }`}
                            disabled={currentAnswer === ""}
                        >
                            {currentQuestionIndex < myQuiz.length - 1 ? "Next" : "Finish"}
                        </button>
                    </form>
                    <div className="mt-4">
                        <p>Time: <span>{`${time.hours}:${time.minutes}:${time.seconds}`}</span></p> 
                    </div>
                </div>
            )}
        </div>
    );
}
