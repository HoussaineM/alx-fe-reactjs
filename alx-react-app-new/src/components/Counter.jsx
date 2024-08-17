import React from "react";
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    function incrementCount() {
        setCount(prevCount => prevCount + 1);
    }
    function decrementCount() {
        setCount(prevCount => prevCount - 1);
    }
    function resetCount() {
        setCount(0);
    }
    return (
        <div className="count-container">
            <p style={{ color: "#00a", fontSize:"25px"}}>Count is: <span style={{ color: "#b42", fontSize:"25px"}}>{count}</span></p>
            <div className="count-buttons">
                <button onClick={incrementCount}>Increment count +</button>
                <button onClick={decrementCount}>Decrement count -</button>
                <button onClick={resetCount}>Reset count</button>
            </div>
        </div>
    );
}