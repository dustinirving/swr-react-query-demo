export async function fetchTodos(): Promise<{ id: number; content: string }[]> {
  const response = await fetch("http://localhost:3000/todos");
  const data = await response.json();
  return data;
}

export async function addTodo(
  content: string
): Promise<{ id: number; content: string }> {
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
