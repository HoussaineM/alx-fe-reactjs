import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 w-full flex justify-between items-center px-8">
            {/* Left section with text */}
            <div className="text-gray-400 text-sm">
                QuizTime © 2024 | Crafted by Houssaine.
            </div>

            {/* Right section with social media icons */}
            <div className="flex space-x-6">
                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/houssaine-el-maallem/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400"
                >
                    <i className="fab fa-linkedin fa-lg"></i>
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com/HoussaineM/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400"
                >
                    <i className="fab fa-github fa-lg"></i>
                </a>

                {/* X (Twitter) */}
                <a
                    href="https://x.com/houssine_malme/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-500"
                >
                    <i className="fab fa-x fa-lg"></i> {/* Using the X icon */}
                </a>
            </div>
        </footer>
    );
}
