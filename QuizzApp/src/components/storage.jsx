//Fetch Categories:

const fetchCategories = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return data.trivia_categories;
  };

  //Fetch Questions:
  const fetchQuestions = async (amount, category, difficulty) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
    const data = await response.json();
    return data.results;
  };

  //State Management
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  //UI Components
  const QuestionCard = ({ question, onAnswer }) => {
    return (
      <div>
        <h2>{question.question}</h2>
        {question.incorrect_answers.concat(question.correct_answer).map(answer => (
          <button key={answer} onClick={() => onAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    );
  };

  //Quiz Logic
  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  //Deployment

  // App.jsx
import React, { useState, useEffect } from 'react';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import ScoreSummary from './components/ScoreSummary';
import { fetchCategories, fetchQuestions } from './api';

const App = () => {
  // State variables...

  return (
    <div className="app">
      {/* Conditional rendering based on the current state */}
      {currentStep === 'start' && <QuizStart categories={categories} onStart={startQuiz} />}
      {currentStep === 'quiz' && <QuestionCard question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />}
      {currentStep === 'score' && <ScoreSummary score={score} total={questions.length} />}
    </div>
  );
};

export default App;