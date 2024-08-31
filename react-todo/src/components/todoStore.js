import React from 'react';

const TodoList = ({ todos, toggleTodo }) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index} onClick={() => toggleTodo(index)}>
                    {todo.completed ? <strike>{todo.text}</strike> : todo.text}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
