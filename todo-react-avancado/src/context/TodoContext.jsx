import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState.js";

const TodoContext = createContext(null);

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function TodoProvider({ children }) {
  // useState + useEffect estão presentes dentro do hook customizado (useLocalStorageState)
  const [todos, setTodos] = useLocalStorageState("todos_v1", []);
  const [filter, setFilter] = useState("all"); // all | active | done

  const addTodo = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: makeId(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }, [setTodos]);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [setTodos]);

  const removeTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "done") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    const active = total - done;
    return { total, done, active };
  }, [todos]);

  // Memoization do value para evitar rerender desnecessário em consumidores do contexto
  const value = useMemo(
    () => ({
      todos,
      filter,
      setFilter,
      filteredTodos,
      stats,
      addTodo,
      toggleTodo,
      removeTodo,
    }),
    [todos, filter, filteredTodos, stats, addTodo, toggleTodo, removeTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos deve ser usado dentro de <TodoProvider />");
  return ctx;
}
