import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
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

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");

  const userStr = localStorage.getItem("user");
  const user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch(() => toast.error("Failed to load posts"));
  }, []);

  const handleDelete = async (id: string) => {
    if (!user?.token) {
      toast.error("Login required");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Delete failed");
    }
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-2 border border-gray-300 rounded"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        filtered.map((post) => (
          <div key={post._id} className="bg-white shadow p-4 rounded mb-6">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">by {post.author.name}</p>

            {post.image && (
              <img
                src={`http://localhost:5000${post.image}`}
                alt={post.title}
                className="w-full max-h-60 object-cover rounded mb-4"
              />
            )}
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {user && user.name === post.author.name && (
              <div className="mt-4 flex gap-4">
                <Link
                  to={`/edit/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
