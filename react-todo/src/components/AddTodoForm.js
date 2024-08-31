import React, { useState } from "react";
import useTodo from "./store/todoStore";

export default function AddTodoForm() {
    const [list, setList] = useState("");
    const addList = useTodo(state => state.addTodo);

    function handleChange(e) {
        setList(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        addList(list);
        setList("");
    }

    return (
        <form onSubmit={handleSubmit} className="form-todo">
            <input type="text"
                name="list"
                value={list}
                onChange={handleChange}
            />
            <button type="submit">Add</button>
        </form>
    );
}