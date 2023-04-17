import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import useSWR from "swr";
import { fetchTodos, addTodo } from "./todo-apis";
import todoQueryKeys from "./todo-keys";

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isValidating, mutate } = useSWR(
    todoQueryKeys.all,
    () => fetchTodos()
  );

  if (isLoading) {
    return <p>Loading todos...</p>;
  }

  if (data?.length === 0 || data === undefined) {
    return <p>No todos... </p>;
  }

  function addTodoHandler() {
    const value = inputRef.current?.value;

    if (!value) {
      return;
    }

    if (data !== undefined) {
      mutate([...data, { id: Math.random(), content: value }]);
    }

    addTodo(value);
  }

  return (
    <>
      <h1>My todos</h1>

      <div>
        <input type="text" ref={inputRef} />
        <button onClick={addTodoHandler}>Add new item</button>
      </div>

      {data.map((todo) => (
        <li key={todo.id}>
          <p>ID: {todo.id}</p>
          {todo.content} <Link to={`edit/${todo.id}`}>Edit</Link>
          <button>DELETE</button>
        </li>
      ))}
    </>
  );
}

export default Home;
