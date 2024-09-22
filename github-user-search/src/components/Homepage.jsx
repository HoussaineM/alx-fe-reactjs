import React from "react";
import Search from "./Search";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">GitHub User Search</h1>
                <Search />
            </div>
        </div>

    );
}