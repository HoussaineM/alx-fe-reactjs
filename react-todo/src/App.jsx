import React from 'react'
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

function App() {


  return (
    <div className='toto-app'>
      <h1>Todo-List with Jest</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App