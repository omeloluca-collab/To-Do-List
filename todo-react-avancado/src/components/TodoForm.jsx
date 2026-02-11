import { useTodos } from "../context/TodoContext.jsx";
import useInput from "../hooks/useInput.js";

export default function TodoForm() {
  const { addTodo } = useTodos();
  const input = useInput("");

  function onSubmit(e) {
    e.preventDefault();
    addTodo(input.value);
    input.reset();
  }

  return (
    <form className="row" onSubmit={onSubmit}>
      <input
        className="input"
        placeholder="Digite uma tarefa e pressione Enter…"
        value={input.value}
        onChange={input.onChange}
        aria-label="Nova tarefa"
      />
      <button className="btn" type="submit">
        Adicionar
      </button>
    </form>
  );
}
