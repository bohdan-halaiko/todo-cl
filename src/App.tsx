import { useState } from "react";
import type { SyntheticEvent } from "react";
import "./App.css";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = (event: SyntheticEvent) => {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos((todos) => [...todos, { id: crypto.randomUUID(), text: value, done: false }]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const left = todos.filter((todo) => !todo.done).length;

  return (
    <main className="todo-app">
      <h1>Todo</h1>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          className="todo-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Що потрібно зробити?"
          aria-label="Нова задача"
        />
        <button type="submit" className="todo-add" disabled={!text.trim()}>
          Додати
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="todo-empty">Поки що задач немає</p>
      ) : (
        <>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.done ? "done" : undefined}>
                <label>
                  <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
                  <span>{todo.text}</span>
                </label>
                <button
                  type="button"
                  className="todo-remove"
                  onClick={() => removeTodo(todo.id)}
                  aria-label={`Видалити «${todo.text}»`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <p className="todo-count">Залишилось: {left}</p>
        </>
      )}
    </main>
  );
}

export default App;
