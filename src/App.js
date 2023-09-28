import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputText,
          completed: false,
        },
      ]);
      setInputText('');
    }
  };

  const handleCompleteTodo = (id) => {
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  // Separate completed and incomplete todos
  const completedTodos = updatedTodos.filter((todo) => todo.completed);
  const incompleteTodos = updatedTodos.filter((todo) => !todo.completed);

  // Combine incomplete todos and completed todos (completed ones will be at the bottom)
  const combinedTodos = [...incompleteTodos, ...completedTodos];

  setTodos(combinedTodos);
};


  const handleReset = () => {
    setTodos([]);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    console.log(savedTodos);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('UseEffect for saving data to localStorage fired.');
  }, [todos]); 

  return (
    <div className="App">
      <div className="header">
        <input
          type="text"
          placeholder="Add a new TODO..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Add</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <TodoList todos={todos} onCompleteTodo={handleCompleteTodo} />
    </div>
  );
}

export default App;
