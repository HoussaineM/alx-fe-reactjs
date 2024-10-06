import React from "react";
import { Link } from "react-router-dom";
import useQuizStore from "./QuizStore";
import SearchingBar from "./SearchingBar";

export default function History() {
    const filterHistory = useQuizStore(state => state.filterHistory);

    const displayHistory = filterHistory.length > 0 ? (
        filterHistory.map(item => (
            <div key={item.id} className="bg-gray-800 p-4 mb-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-2">Topic: {item.topic}</h2>
                <h3 className="text-lg font-semibold mb-2">Difficulty: {item.level}</h3>
                <div className="space-y-1">
                    <p><span className="font-semibold">Score:</span> {item.scored}%</p>
                    <p><span className="font-semibold">Time taken:</span> {`${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}`}</p>
                    <p><span className="font-semibold">Date:</span> {item.date}</p>
                </div>
            </div>
        ))
    ) : (
        <p className="text-gray-400">No history available.</p>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-8"> 
            <div className="bg-gray-800 p-12 rounded shadow-md w-full max-w-4xl mt-8">
                <h2 className="text-4xl font-bold mb-6">Quiz History</h2> 
                
                {/* Updated Go back button with green color and button design */}
                <Link 
                    to="/" 
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mb-4 inline-block text-center transition-all"
                >
                    Go back
                </Link>
                
                <SearchingBar />

                <div className="mt-6 space-y-4">
                    {displayHistory}
                </div>
            </div>
        </div>
    );
}
