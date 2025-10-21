import { useState } from "react";
import { Check, Pencil, Trash, MoreVertical, ListTodo, Plus  } from "lucide-react";
import { SubTask, TodoStatus } from "./TodoList";

export interface TodoItemProps {
    todo: { 
        id: number; 
        title: string;
        description: string;
        subTasks: SubTask[]; 
        status: TodoStatus; 
    };
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, updated: Partial<TodoItemProps["todo"]>) => void;
}

export default function TodoItem({ 
    todo,
    deleteTodo,
    updateTodo,
}: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDescription, setNewDescription] = useState(todo.description);
    const [editSubIndex, setEditSubIndex] = useState<number | null>(null);
    const [editSubText, setEditSubText] = useState<string>("");
    const [checkedTasks, setCheckedTasks] = useState<boolean[]>(
        Array.isArray(todo.subTasks) ? todo.subTasks.map(() => false) : []
    );
    const [isAdding, setIsAdding] = useState(false);
    const [newSubtask, setNewSubtask] = useState("");

    const handleSave = () => {
        updateTodo(todo.id, {
            title: newTitle,
            description: newDescription,
        });
        setIsEditing(false);
        setShowMenu(false);
    }

    const toggleSubTask = (index: number) => {
        const updatedSubtasks = todo.subTasks.map((sub, i) =>
            i === index ? { ...sub, checked: !sub.checked } : sub
        );

        const total = updatedSubtasks.length;
        const done = updatedSubtasks.filter((s) => s.checked).length;

        let newStatus: TodoStatus = "to-do";
        if (done === 0) newStatus = "to-do";
        else if (done < total) newStatus = "ongoing";
        else newStatus = "completed";

        updateTodo(todo.id, { subTasks: updatedSubtasks, status: newStatus });
    };

    const handleSaveSubtask = (index: number) => {
        if (editSubText.trim() === "") return;
        const updatedSubtasks = [...todo.subTasks];
        updatedSubtasks[index].text = editSubText;
        updateTodo(todo.id, { subTasks: updatedSubtasks });
        setEditSubIndex(null);
        setEditSubText("");
    };

    const handleAddSubtask = () => {
        if (newSubtask.trim() === "") return;
        const updatedSubtasks = [...(todo.subTasks || []), { text: newSubtask, checked: false }];
        updateTodo(todo.id, { subTasks: updatedSubtasks });
        setNewSubtask("");
        setIsAdding(false);
    };

    return (
        <div className={`todo-item ${todo.status}`}>
            <div className="todo-header">
                {isEditing ? (
                    <div className="edit-block">
                        <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="edit-input"
                            placeholder="Edit judul..."
                        />
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="edit-textarea"
                            placeholder="Edit deskripsi..."
                        />
                        <button onClick={handleSave} className="save-btn" title="Simpan">
                            <Check size={18} color="green" />
                        </button>
                    </div>
                    ) : (
                    <>
                        <div className="todo-info">
                            <div className="todo-title">
                                {todo.title}
                                {todo.status === "completed" && <Check color="green" size={16} />}
                            </div>
                            {todo.description && (
                                <div className="todo-description">{todo.description}</div>
                            )}
                        </div>

                        <div className="menu-container">
                            <button
                                title="open menu"
                                className="menu-button"
                                onClick={() => setShowMenu((prev) => !prev)}
                            >
                                <MoreVertical size={18} />
                            </button>
                            {showMenu && (
                                <div className="dropdown-menu">
                                    <button onClick={() => setIsEditing(true)}>
                                        <Pencil size={14} /> Edit
                                    </button>
                                    <button onClick={() => deleteTodo(todo.id)}>
                                        <Trash size={14} /> Hapus
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
                
            </div>

            {todo.subTasks && todo.subTasks.length > 0 && (
                <ul className="subtask-list">
                {todo.subTasks.map((sub, index) => (
                    <li key={index} className="subtask-item">
                    {editSubIndex === index ? (
                        <div className="subtask-edit">
                            <input
                                title="Subtask"
                                type="text"
                                value={editSubText}
                                onChange={(e) => setEditSubText(e.target.value)}
                                className="subtask-input"
                            />
                            <button onClick={() => handleSaveSubtask(index)} title="Simpan">
                                <Check size={14} color="green" />
                            </button>
                        </div>
                    ) : (
                        <label>
                            <input
                                type="checkbox"
                                checked={sub.checked}
                                onChange={() => toggleSubTask(index)}
                            />
                            <span
                                className={`subtask-text ${
                                sub.checked || todo.status === "completed" ? "checked" : ""
                                }`}
                            >
                                {sub.text}
                            </span>
                            <button
                                type="button"
                                className="subtask-edit-btn"
                                onClick={() => {
                                setEditSubIndex(index);
                                setEditSubText(sub.text);
                                }}
                                title="Edit aktivitas"
                            >
                                <Pencil size={12} color="#6c4a1a" />
                            </button>
                        </label>
                    )}
                    </li>
                ))}
                </ul>
            )}

            {isAdding ? (
                <div className="subtask-add">
                    <input
                        type="text"
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        className="subtask-input"
                        placeholder="Tulis aktivitas baru..."
                    />
                    <button onClick={handleAddSubtask} title="Tambah">
                        <Check size={16} color="green" />
                    </button>
                </div>
            ) : (
                <button
                    className="add-subtask-btn"
                    onClick={() => setIsAdding(true)}
                    title="Tambah aktivitas"
                >
                    <Plus size={14} /> Tambah Aktivitas
                </button>
            )}

            <div className={`status-label status-${todo.status}`}>
                {todo.status.toUpperCase()}
            </div>
        </div>
    )
}