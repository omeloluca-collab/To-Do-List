import { TodoProvider } from "./context/TodoContext.jsx";
import TodoForm from "./components/TodoForm.jsx";
import TodoFilters from "./components/TodoFilters.jsx";
import TodoList from "./components/TodoList.jsx";

export default function App() {
  return (
    <TodoProvider>
      <div className="page">
        <header className="header">
          <h1>To Do List• React Avançado</h1>
        </header>

        <main className="card">
          <TodoForm />
          <TodoFilters />
          <TodoList />
        </main>

        <footer className="footer">
          <small>OBS* Persistência via localStorage + otimizações com memo</small>
        </footer>
      </div>
    </TodoProvider>
  );
}
