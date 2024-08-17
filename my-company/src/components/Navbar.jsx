import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const styles = { color: "#80f", padding: "10px", textDecoration: 'none', fontSize: "30px" }
    return (
        <div className="nav-link"
            style={{
                padding: "0 30px",
                backgroundColor: "rgba(80,80,80,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Link to="/" style={styles}>Home</Link>
            <Link to="/about" style={styles}>About</Link>
            <Link to="/services" style={styles}>Services</Link>
            <Link to="/contact" style={styles}>Contact</Link>
        </div>
    );
}

export default Navbar;