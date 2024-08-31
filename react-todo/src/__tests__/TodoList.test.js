import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

test('renders TodoList component', () => {
    const todos = [{ text: 'Learn React', completed: false }];
    render(<TodoList todos={todos} toggleTodo={() => {}} />);
    
    const todoItem = screen.getByText(/learn react/i);
    expect(todoItem).toBeInTheDocument();
});

test('toggles todo completion', () => {
    const todos = [{ text: 'Learn React', completed: false }];
    const toggleTodo = jest.fn();

    render(<TodoList todos={todos} toggleTodo={toggleTodo} />);
    
    const todoItem = screen.getByText(/learn react/i);
    fireEvent.click(todoItem);

    expect(toggleTodo).toHaveBeenCalledWith(0);
});
