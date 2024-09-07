import React from "react";

function UserProfile() {
    return (
        <div
            className="user-profile bg-gray-100 p-4 sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl transition-box-shadow duration-5000 ease-in-out"
        >
            <img
                src="https://via.placeholder.com/150"
                alt="User"
                className="rounded-full w-36 h-36 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full mx-automx-auto hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <h1 className="text-lg sm:text-lg md:text-xl text-blue-800 my-4 hover:text-blue-500 transition-color duration-3000 ease-in-out">John Doe</h1>
            <p className="text-gray-600 text-base sm:text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
        </div>
    );
}

export default UserProfile;