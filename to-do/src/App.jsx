import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const apiUrl = 'http://localhost:3000/api/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(apiUrl);
    setTodos(response.data);
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    const response = await axios.post(apiUrl, { text: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const handleToggleComplete = async (id) => {
    const response = await axios.put(`${apiUrl}/${id}`);
    setTodos(todos.map(todo => todo.id === id ? response.data : todo));
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Todo List</h1>

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.button}>Add</button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.todoItem}>
            <span
              onClick={() => handleToggleComplete(todo.id)}
              style={{
                ...styles.todoText,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#000'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)} style={styles.deleteBtn}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  title: {
    marginBottom: '20px'
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  input: {
    flex: '1',
    padding: '8px'
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  list: {
    listStyle: 'none',
    padding: '0'
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #ccc'
  },
  todoText: {
    cursor: 'pointer',
    flex: 1,
    textAlign: 'left'
  },
  deleteBtn: {
    marginLeft: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#d11a2a',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default App;
