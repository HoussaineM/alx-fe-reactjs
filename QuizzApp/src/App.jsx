import React from 'react';
import "./index.css";
import { Outlet, Link } from 'react-router-dom';
import Footer from './components/Footer'; // Import the Footer component
import useQuizStore from './components/QuizStore'; // Import the useQuizStore from QuizStore

export default function App() {
  const setQuizState = useQuizStore(state => state.setQuizState); // Access the setQuizState from the store

  // Reset to quiz start when "QUIZTIME" is clicked
  function handleQuizTimeClick() {
    setQuizState("start");
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-4">
      <header className='text-blue-400 text-4xl font-bold mb-6'>
        <Link to="/" onClick={handleQuizTimeClick} className="no-underline hover:no-underline">
          QUIZTIME⏰
        </Link>
      </header>
      <Outlet />
      <Footer /> {/* Adding the Footer component here */}
    </div>
  );
}
