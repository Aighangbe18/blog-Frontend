import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (!data.token) throw new Error();
        setUser({ name: data.name, email: data.email });
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
          My Profile
        </h1>
        {user ? (
          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-red-500">No user found.</p>
        )}
      </div>
    </div>
  );
}
