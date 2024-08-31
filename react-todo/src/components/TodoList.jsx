import React from "react";
import useTodo from "./store/todoStore";

export default function TodoList() {
    const todos = useTodo(state => state.todo);
    const remove = useTodo(state => state.removeTodo);
    const check = useTodo(state => state.checkedTodo);
    // const arr1 = ["Tomato", "Orange", "apple"];
    function removeTodo(id) {
        remove(id);
    }

    function handleChange(id) {
        check(id);
    }

    return (
        <div className="todo-container">
            {todos.map((item) => (
                <li key={item.id}>
                    <input type="checkbox"
                        checked={item.isHeld}
                        onChange={() => handleChange(item.id)}
                    />
                    <span
                        style={{ textDecoration: item.isHeld ? "line-through" : "none" }}
                    >{item.text}</span>
                    <button onClick={() => removeTodo(item.id)}>Remove</button>
                </li>
            ))}
        </div>
    );
}