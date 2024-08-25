import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/favorite">Favorites</Link>
            <Link to="/recomandation">Recommendations</Link>
        </nav>
    );
}


export default Header;