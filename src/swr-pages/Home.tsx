import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import * as todoApi from "./todo-apis";
import todoQueryKeys from "./todo-keys";
import { toast } from "react-toastify";

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: todos,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR(todoQueryKeys.all, () => todoApi.fetchTodos(), {
    onSuccess: () => {
      toast("Todos fetched successfully", { autoClose: 1000 });
    },
    // DEMO: set to true and restart server with new data
    revalidateOnFocus: false,
  });

  const { mutate: mutateUnbounded } = useSWRConfig();

  // function addTodoMutateBounded() {
  //   const value = inputRef.current?.value;

  //   if (!value) {
  //     return;
  //   }

  //   if (todos !== undefined) {
  //     /** bounded mutate function, with optimistic update and error rollback */
  //     mutate([...todos, { id: `${Math.random()}`, content: value }], {
  //       rollbackOnError(error: any) {
  //         return error.name !== "AbortError";
  //       },
  //     });
  //   }

  //   todoApi.addTodo(value);
  // }

  function addTodoUnbounded() {
    const value: string | undefined = inputRef.current?.value;

    if (!value) {
      return;
    }

    if (todos !== undefined) {
      /** unbounded mutate function, with optimistic update and error rollback */
      mutateUnbounded(todoQueryKeys.all, () => todoApi.addTodo(value), {
        rollbackOnError: (error: any) => {
          toast("Error while adding todo");
          return true;
        },
        optimisticData: (currentData: any) => [
          ...currentData,
          { id: `${Math.random()}`, content: value },
        ],
        populateCache: (data) => {
          return [...todos, data];
        },
        revalidate: false,
      });
    }
  }

  if (error) {
    // DEMO: stop server
    return (
      <p style={{ color: "red", fontSize: "2rem" }}>
        Error while fetching todos.
      </p>
    );
  }

  return (
    <>
      <h1>My todos</h1>

      <div>
        <input type="text" ref={inputRef} />
        <button onClick={addTodoUnbounded}>Add new item</button>
      </div>

      <ul style={{ listStyle: "none" }}>
        {isLoading && <p> Fetching todos... </p>}
        {isValidating && <p> Revalidating todos.... </p>}
        {!isLoading &&
          todos?.map((todo) => (
            <li
              style={{ display: "flex", alignItems: "baseline" }}
              key={todo.id}
            >
              <p style={{ marginRight: "1rem" }}>ID: {todo.id}</p>
              <p style={{ marginRight: "1rem" }}> {todo.content} </p>
              <Link to={`edit/${todo.id}`} style={{ marginRight: "1rem" }}>
                Edit
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Home;
