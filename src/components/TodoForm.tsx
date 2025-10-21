import { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";

type TodoFormProps = {
    addTodo: (
        title: string,
        description: string,
        subtasks: string[],
        status?: string
    ) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subtasks, setSubtasks] = useState<string[]>([]);

    const handleAddSubtask = () => setSubtasks([...subtasks, ""]);

    const handleChangeSubtask = (index: number, value: string) => {
        const updated = [...subtasks];
        updated[index] = value;
        setSubtasks(updated);
    }

    const handleRemoveSubtask = (index: number) => {
        const updated = subtasks.filter((_, i) => i !== index);
        setSubtasks(updated);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTodo(title, description, subtasks.filter((s) => s.trim() !== ""), "to-do");
        setTitle("");
        setDescription("");
        setSubtasks([""]);
        setShowModal(false);
    }

    return (
        <div className="todo-form">
            <button onClick={() => setShowModal(true)} className="add-todo-button">
                <Plus size={20}/> Tambah Tugas
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button
                            title="close"
                            className="close-button"
                            onClick={() => setShowModal(false)}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="modal-title">Tambah Tugas Baru</h2>

                        <form onSubmit={handleSubmit} className="form">
                        <label>
                            Judul
                            <input
                            type="text"
                            placeholder="Judul tugas..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            />
                        </label>

                        <label>
                            Deskripsi
                            <textarea
                                placeholder="Deskripsi tugas..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>

                        <div className="subtask-section">
                            <p>List Aktivitas:</p>
                            {subtasks.map((task, index) => (
                            <div className="subtask-row" key={index}>
                                <input
                                type="text"
                                placeholder={`Aktivitas ${index + 1}`}
                                value={task}
                                onChange={(e) =>
                                    handleChangeSubtask(index, e.target.value)
                                }
                                />
                                {subtasks.length > 1 && (
                                <button
                                    title="Remove"
                                    type="button"
                                    onClick={() => handleRemoveSubtask(index)}
                                    className="remove-subtask"
                                >
                                    <Trash2 size={16} />
                                </button>
                                )}
                            </div>
                            ))}
                            <button
                            type="button"
                            className="add-subtask"
                            onClick={handleAddSubtask}
                            >
                            + Tambah Aktivitas
                            </button>
                        </div>

                        <button type="submit" className="create-button">
                            Buat Tugas
                        </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}