import { useState } from 'react';
import type { KeyboardEvent, SyntheticEvent } from 'react';
import './App.css';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = (event: SyntheticEvent) => {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos((todos) => [...todos, { id: crypto.randomUUID(), text: value, done: false }]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = (id: string) => {
    const value = editText.trim();
    if (!value) return;
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, text: value } : todo)));
    cancelEdit();
  };

  const onEditKeyDown = (event: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (event.key === 'Enter') saveEdit(id);
    if (event.key === 'Escape') cancelEdit();
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
              <li key={todo.id} className={todo.done ? 'done' : undefined}>
                {editingId === todo.id ? (
                  <>
                    <input
                      className="todo-input todo-edit"
                      value={editText}
                      onChange={(event) => setEditText(event.target.value)}
                      onKeyDown={(event) => onEditKeyDown(event, todo.id)}
                      aria-label="Текст задачі"
                      autoFocus
                    />
                    <button
                      type="button"
                      className="todo-icon-button"
                      onClick={() => saveEdit(todo.id)}
                      disabled={!editText.trim()}
                      aria-label="Зберегти"
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className="todo-icon-button"
                      onClick={cancelEdit}
                      aria-label="Скасувати"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <>
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <span>{todo.text}</span>
                    </label>
                    <button
                      type="button"
                      className="todo-icon-button"
                      onClick={() => startEdit(todo)}
                      disabled={editingId !== null}
                      aria-label={`Редагувати «${todo.text}»`}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="todo-icon-button"
                      onClick={() => removeTodo(todo.id)}
                      aria-label={`Видалити «${todo.text}»`}
                    >
                      ×
                    </button>
                  </>
                )}
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
