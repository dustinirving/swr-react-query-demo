export async function fetchTodos(): Promise<{ id: string; content: string }[]> {
  const response = await fetch("http://localhost:3000/todos");
  const data = await response.json();
  return data;
}

export async function fetchTodoById(
  id: string
): Promise<{ id: string; content: string }> {
  const response = await fetch("http://localhost:3000/todos/" + id);
  const data = await response.json();
  return data;
}

export async function addTodo(
  content: string
): Promise<{ id: string; content: string }> {
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  return data;
}

export async function editTodo(
  id: string,
  newName: string
): Promise<{ id: string; content: string }> {
  // DEMO: switch id with newName to throw error
  const response = await fetch("http://localhost:3000/todos/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newName }),
  });

  const data = await response.json();

  return data;
}
