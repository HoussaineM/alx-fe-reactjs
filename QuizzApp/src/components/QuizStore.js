import { create } from "zustand";

const useQuizStore = create(set => ({
    // Quiz state management
    quizState: "start",
    setQuizState: (newstate) => set({ quizState: newstate }),

    // User's quiz choices
    quizChoices: {},
    setQuizChoices: (choice) => set({ quizChoices: choice }),

    // Score tracking
    quizScore: {},
    setQuizScore: (score) => set({ quizScore: score }),

    // Current quiz questions
    myQuiz: [],
    setMyQuiz: (newquiz) => set({ myQuiz: newquiz }),

    // Loader state
    quizLoader: true,
    setQuizLoader: (value) => set({ quizLoader: value }),

    // Quiz history management
    quizHistory: [],
    setQuizHistory: () => set(state => {
        const updatedHistory = [...state.quizHistory, state.quizScore];
        return { 
            quizHistory: updatedHistory,
            filterHistory: updatedHistory // Update filterHistory to reflect changes
        };
    }),

    // Search functionality
    searchTerm: "",
    setSearchTerm: (term) => set({ searchTerm: term }),

    // Filtered history based on search
    filterHistory: [],
    setFilterHistory: () => set(state => ({
        filterHistory: state.quizHistory.filter(quiz =>
            quiz.topic.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
    })),

}));

export default useQuizStore;
