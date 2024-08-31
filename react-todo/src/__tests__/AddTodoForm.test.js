import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../components/AddTodoForm';

test('renders AddTodoForm and adds todo', () => {
    const addTodo = jest.fn();

    render(<AddTodoForm addTodo={addTodo} />);
    
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    expect(addTodo).toHaveBeenCalledWith('New Task');
    expect(input.value).toBe('');
});
