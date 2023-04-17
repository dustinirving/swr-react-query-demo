import { useEffect, useState } from 'react';
import Posts from './Posts';

async function fetcher(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function LifecycleQuery() {
  const [posts, setPosts] = useState<{ id: 'string'; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPosts = async () => {
      const newPosts = await fetcher('http://localhost:3000/posts');
      setPosts(newPosts);
      setLoading(false);
    };
    getPosts();
  }, []);

  return (
    <div>
      <h1>Lifecycle Query</h1>
      <Posts posts={posts} loading={loading} />
    </div>
  );
}
