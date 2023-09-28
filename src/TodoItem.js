import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onCompleteTodo }) => {
  const handleComplete = () => {
    onCompleteTodo(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-text">{todo.text}</div>
      <button onClick={handleComplete} className="complete-button">
        {todo.completed ? 'Completed' : 'Complete'}
      </button>
    </div>
  );
};

export default TodoItem;
