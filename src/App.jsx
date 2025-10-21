import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  // state menyimpan tugas
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
      console.log("Saved todos:", todos);
    } catch (error) {
      console.error("Failed to save todos:", error);
    }
  }, [todos]);


  const addTodo = (title, description, subtasks, status) => {
    setTodos([...todos, { 
      id: Date.now(),
      title,
      description,
      subTasks: (subtasks || []).map((s) => ({
        text: s,
        checked: false,
      })),
      status: status || "to-do",
    }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  };

  const updateTodo = (id, updated) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? {...todo, ...updated} : todo
      )
    )
  }

  const todoTasks = todos.filter((t) => t.status === "to-do");
  const ongoingTasks = todos.filter((t) => t.status === "ongoing");
  const completedTasks = todos.filter((t) => t.status === "completed");

  return (
    <div className='App'>
      <div className='App2'>
        <div className='section1'>
          <h1 className='header'>Focyus<span className='subHeader'>In</span></h1>
          <TodoForm addTodo={addTodo}/>
        </div>

        <div className="board-container">
          <div className="board-column">
            <h2 className="board-title to-do">📝 To-Do</h2>
            <TodoList todos={todoTasks} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          </div>

          <div className="board-column">
            <h2 className="board-title ongoing">🚧 Ongoing</h2>
            <TodoList todos={ongoingTasks} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          </div>

          <div className="board-column">
            <h2 className="board-title completed">✅ Completed</h2>
            <TodoList todos={completedTasks} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App