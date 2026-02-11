import React, { useMemo } from "react";
import { useTodos } from "../context/TodoContext.jsx";
import TodoItem from "./TodoItem.jsx";

function TodoListBase() {
  const { filteredTodos } = useTodos();

  const emptyMessage = useMemo(() => {
    return "Nenhuma tarefa por aqui. Adicione a primeira! 🙂";
  }, []);

  if (filteredTodos.length === 0) {
    return <p className="empty">{emptyMessage}</p>;
  }

  return (
    <ul className="list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default React.memo(TodoListBase);
