import React from "react";
import { useTodos } from "../context/TodoContext.jsx";

function TodoFiltersBase() {
  const { filter, setFilter, stats } = useTodos();

  return (
    <div className="filters">
      <div className="filterButtons">
        <button
          className={`chip ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
          type="button"
        >
          Todas ({stats.total})
        </button>

        <button
          className={`chip ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
          type="button"
        >
          Pendentes ({stats.active})
        </button>

        <button
          className={`chip ${filter === "done" ? "active" : ""}`}
          onClick={() => setFilter("done")}
          type="button"
        >
          Concluídas ({stats.done})
        </button>
      </div>
    </div>
  );
}

export default React.memo(TodoFiltersBase);
