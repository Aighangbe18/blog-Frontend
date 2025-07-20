// components/MyPosts.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: {
    _id: string;
    name: string;
  };
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user?.token) return;
    axios
      .get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        const mine = res.data.filter((p: Post) => p.author._id === user.id);
        setPosts(mine);
      })
      .catch(() => toast.error("Error loading posts"));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white shadow p-4 mb-6 rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            {post.image && (
              <img
                src={`http://localhost:5000${post.image}`}
                alt={post.title}
                className="w-full max-h-60 object-cover mb-4 rounded"
              />
            )}
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
