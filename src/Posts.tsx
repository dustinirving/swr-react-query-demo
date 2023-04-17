export default function Posts({
  loading,
  posts,
}: {
  loading: boolean;
  posts: { id: string; title: string }[];
}) {
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
