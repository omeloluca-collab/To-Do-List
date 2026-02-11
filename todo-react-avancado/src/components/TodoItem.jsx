import React from "react";
import { useTodos } from "../context/TodoContext.jsx";

function TodoItemBase({ todo }) {
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <li className="item">
      <label className={`itemLeft ${todo.completed ? "done" : ""}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          aria-label={`Marcar ${todo.text} como concluída`}
        />
        <span>{todo.text}</span>
      </label>

      <button className="iconBtn" onClick={() => removeTodo(todo.id)} type="button" aria-label="Remover tarefa">
        ✕
      </button>
    </li>
  );
}

export default React.memo(TodoItemBase);
