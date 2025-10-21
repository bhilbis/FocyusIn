import TodoItem, { TodoItemProps } from "./TodoItem";

export type SubTask = {
  text: string;
  checked: boolean;
};

export type TodoStatus = "to-do" | "ongoing" | "completed";

export interface Todo {
    id: number;
    title: string;
    description: string;
    subTasks: SubTask[];
    status: TodoStatus;
}

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    updateTodo: (id: number,  updated: Partial<Todo>) => void;
}

export default function TodoList({ todos, deleteTodo, updateTodo }: TodoListProps) {
    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <p className="no-task">Tidak ada tugas yang tersedia</p>
            ) : (
                todos?.map((todo: any) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                ))
            )}
        </div>
    );
}