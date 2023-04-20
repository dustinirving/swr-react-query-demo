import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Posts from './Posts';

async function fetchPosts() {
  const response = await fetch('http://localhost:3000/posts');
  const data = await response.json();
  return data;
}

async function addPost(title: string) {
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  return data;
}

const postsKey = 'posts';

export default function ReactQuery() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    isError,
    data: posts,
  } = useQuery({
    queryKey: [postsKey],
    queryFn: fetchPosts,
    // staleTime: 3000, // Time before the data becomes stale
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchInterval: 3000, // Poll API
    // retry: 10, // Will retry failed requests 10 times before displaying an error
  });

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: [postsKey] });
    },
  });
  return (
    <div>
      <h1>React Query</h1>
      <Posts posts={posts} loading={isLoading} error={error} isError={isError} />
      <button onClick={() => mutation.mutate(`Post ${posts.length + 1}`)}>Create Post</button>
    </div>
  );
}
