import { create } from "zustand";

const useTodo = create(set => (
    {
        todo: [],
        addTodo: (task) => {
            set(state => ({ todo: [...state.todo, { text: task, id: Date.now(), isHeld: false }] })
            )

        },
        removeTodo: (id) => {
            set(state => ({
                todo: state.todo.filter(item => item.id !== id)
            }));
        },
        checkedTodo: (id) => {
            set(state => ({
                todo: state.todo.map(item => (
                    item.id === id ? { ...item, isHeld: !item.isHeld } : item
                ))
            }
            ))
        }
    }
));

export default useTodo;