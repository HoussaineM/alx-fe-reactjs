import React, { useEffect, useState } from "react";
import useQuizStore from "./QuizStore";
import { fetchQuestions } from "../services/quizService";
import "../index.css";

export default function QuestionCard() {
    const fetchChoices = useQuizStore(state => state.quizChoices);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizScore = useQuizStore(state => state.setQuizScore);
    const myQuiz = useQuizStore(state => state.myQuiz);
    const setMyQuiz = useQuizStore(state => state.setMyQuiz);
    const setQuizHistory = useQuizStore(state => state.setQuizHistory);
    const quizLoader = useQuizStore(state => state.quizLoader);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [answerOptions, setAnswerOptions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [countTime, setCountTime] = useState(0);
    const [time, setTime] = useState({});
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        if (quizLoader) {
            handleFetch();
        }
    }, []);

    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            handleTime(countTime);
            let timer = setTimeout(() => {
                setCountTime(countTime + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [myQuiz, countTime]);

    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex === myQuiz.length) {
            myHistory();
            setQuizHistory();
            setQuizState("score");
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            setCurrentQuestion(myQuiz[currentQuestionIndex]);
        }
    }, [myQuiz, currentQuestionIndex]);

    useEffect(() => {
        if (Object.keys(currentQuestion).length > 0) {
            const randomAnswer = currentQuestion.correct_answer;
            const currentChoices = [...currentQuestion.incorrect_answers];
            const randomPosition = Math.floor(Math.random() * (currentChoices.length + 1));
            currentChoices.splice(randomPosition, 0, randomAnswer);
            setAnswerOptions(currentChoices);
        }
    }, [currentQuestion]);

    const handleFetch = async () => {
        setLoading(true);
        const amount = fetchChoices.number;
        const difficulty = fetchChoices.difficulty;
        const category = fetchChoices.category;
        try {
            const results = await fetchQuestions(amount, category, difficulty);
            setMyQuiz(results);
        } catch (error) {
            setLoadError("Failed to fetch questions.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    function handleAnswer(answer) {
        setCurrentAnswer(answer);
    }

    function myHistory() {
        const topicCategory = currentQuestion.category;
        const topicLevel = currentQuestion.difficulty;
        const str = topicLevel.charAt(0).toUpperCase() + topicLevel.slice(1).toLowerCase();
        const topicId = Date.now();
        const d = new Date(topicId);
        const stringDate = d.toString();
        const correctResponses = score;
        const totalQuestions = myQuiz.length;
        const topicScore = parseInt((correctResponses / totalQuestions) * 100);
        const topicResults = {
            id: topicId,
            topic: topicCategory,
            level: str,
            correct: correctResponses,
            questions: totalQuestions,
            scored: topicScore,
            spent: time,
            date: stringDate,
        };
        setQuizScore(topicResults);
    }

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

        setTime(timeValue);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (currentQuestionIndex < myQuiz.length) {
            const correctAnswer = currentQuestion.correct_answer;
            if (currentAnswer === correctAnswer) {
                setScore(score + 1);
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            {loading && <p className="text-blue-500">Loading questions...</p>}
            {loadError && !Object.keys(currentQuestion).length > 0 && (
                <p className="text-red-500">{loadError}</p>
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
