import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import { render, fireEvent, screen } from "@testing-library/react";

test("renders TodoList component with initial todo", () => {
    render(<TodoList />);
    expect(screen.getByText("Sample Todo")).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText("Remove")).toBeInTheDocument();
});

test("toggles todo completion", () => {
    render(<TodoList />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
});

test("removes a todo item", () => {
    render(<TodoList />);

    fireEvent.click(screen.getByText("Remove"));

    expect(screen.queryByText("Sample Todo")).toBeNull();
});