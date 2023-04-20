export default function Posts({
  loading,
  posts,
  isError,
  error,
}: {
  loading: boolean;
  error?: any;
  isError?: boolean;
  posts: { id: string; title: string }[];
}) {
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
