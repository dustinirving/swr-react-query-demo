import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import todoQueryKeys from "./todo-keys";
import * as todoApi from "./todo-apis";

function EditTodo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();

  const { mutate } = useSWRConfig();

  const { data: todo, isLoading } = useSWR(
    // don't fetch if id is undefined
    id !== undefined ? todoQueryKeys.edit(id) : null,
    ([, , todoId]) => todoApi.fetchTodoById(todoId),
    {
      onSuccess: (data: { id: string; content: string }) => {
        toast("Todo fetch successful ", { autoClose: 1000 });
        if (inputRef.current) {
          inputRef.current.value = data.content;
        }
      },
      revalidateOnFocus: false,
    }
  );

  function onUpdateNameHandler() {
    const value = inputRef.current?.value;

    if (!value || id === undefined) {
      return;
    }

    toast("Updating todo", { autoClose: 1000 });
    mutate(todoQueryKeys.edit(id), () => todoApi.editTodo(id, value), {
      optimisticData: (currentTodo: { id: string; content: string }) => ({
        ...currentTodo,
        content: value,
      }),
      populateCache: true,
      rollbackOnError: (error: any) => {
        if (inputRef.current) {
          inputRef.current.value = todo?.content ?? "";
        }
        toast("Error while updating todo", { autoClose: 1000 });
        return true;
      },
      revalidate: false,
    });
  }

  return (
    <div>
      <h1>Edit Todo</h1>
      {isLoading && <p>loading...</p>}
      <input type="text" ref={inputRef} />
      <button onClick={onUpdateNameHandler}>Update Name</button>
    </div>
  );
}

export default EditTodo;
