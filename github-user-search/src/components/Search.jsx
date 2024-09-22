import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import "../index.css";

function Search() {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setUserData([]);

        try {
            const data = await fetchUserData(username, location, minRepos);
            setUserData(data);
        } catch (err) {
            setError("Looks like we cant find the user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location (Optional)"
                    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    placeholder="Minimum repositories (Optional)"
                    className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>

            {loading && <p className="mt-4 text-gray-500">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {userData.length > 0 && (
                <div className="mt-4">
                    {userData.map(user => (
                        <div key={user.id} className="p-4 border border-gray-200 rounded-lg shadow-sm mb-2">
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-24 h-24 rounded-full mx-auto"
                            />
                            <h2 className="mt-2 text-xl font-semibold text-center">{user.name || user.login}</h2>
                            <p className="text-center">Location: {user.location || 'N/A'}</p>
                            <p className="text-center">Public Repos: {user.public_repos}</p>
                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-2 text-blue-600 hover:underline text-center"
                            >
                                View Profile
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;