import React from "react";
import useQuizStore from "./QuizStore";
import "../index.css";
import { Link } from "react-router-dom";

export default function ScoreSummary() {
    const quizScore = useQuizStore(state => state.quizScore);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);

    function retakeQuiz() {
        setQuizLoader(false);
        setQuizState("quiz");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                
                <Link 
                    to="/history" 
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mb-4 inline-block text-center transition-all"
                >
                    History
                </Link>
                
                <div className="space-y-2">
                    <p><span className="font-semibold">Number of questions:</span> {quizScore.questions}</p>
                    <p><span className="font-semibold">Correct answers:</span> {quizScore.correct}</p>
                    <p><span className="font-semibold">Failed:</span> {quizScore.questions - quizScore.correct}</p>
                    <p><span className="font-semibold">Your average score is:</span> {quizScore.scored}%</p>
                </div>
                
                <div className="mt-4">
                    <p><span className="font-semibold">Time used:</span> {`${quizScore.spent.hours}:${quizScore.spent.minutes}:${quizScore.spent.seconds}`}</p>
                </div>
                
                <div className="flex justify-between mt-6 space-x-4">
                    <button
                        onClick={retakeQuiz}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Retake Quiz
                    </button>
                    <button
                        onClick={() => setQuizState("start")}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    >
                        New Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
