import React, { useState, useEffect } from "react";
import "../index.css";
import useQuizStore from "./QuizStore";

export default function SearchingBar() {
    const setFilterHistory = useQuizStore(state => state.setFilterHistory);
    const setSearchTerm = useQuizStore(state => state.setSearchTerm);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search === "") {
            return;
        } else {
            setSearchTerm(search);
            setFilterHistory();
        }
    }, [search]);

    return (
        <div className="w-full">
            <input
                type="text"
                value={search}
                placeholder="Quiz search"  // Updated placeholder text
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
