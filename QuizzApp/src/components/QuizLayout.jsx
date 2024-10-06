import React from "react";
import QuizStart from "./QuizStart";
import QuestionCard from "./QuestionCard";
import ScoreSummary from "./ScoreSummary";
import useQuizStore from "./QuizStore";

const QuizLayout = () => {
    const currentState = useQuizStore(state => state.quizState);

    return (
        <div>
           
            {currentState === "start" && <QuizStart />}
            {currentState === "quiz" && <QuestionCard />}
            {currentState === "score" && <ScoreSummary />}
        </div>
    )
}

export default QuizLayout;