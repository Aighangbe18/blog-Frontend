import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

declare global {
  interface Window {
    google: any;
  }
}

interface LoginResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Redirect if logged in
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr && userStr !== "undefined") {
      try {
        const user = JSON.parse(userStr);
        if (user?.token) navigate("/");
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  // Google login setup
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google client ID
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("All fields required");

    setLoading(true);
    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/login",
        form
      );

      const { user, token } = res.data;
      localStorage.setItem("user", JSON.stringify({ ...user, token }));

      toast.success(`Welcome back, ${user.name}!`);
      setLoading(false);
      navigate("/profile");
    } catch (err: any) {
      setLoading(false);
      const msg = err.response?.data?.msg || "Login failed. Try again.";
      toast.error(msg);
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/google-login",
        {
          token: response.credential,
        }
      );

      const { user, token } = res.data;
      localStorage.setItem("user", JSON.stringify({ ...user, token }));
      toast.success(`Welcome, ${user.name}!`);
      navigate("/profile");
    } catch (err) {
      toast.error("Google login failed.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors px-4 py-16">
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-white mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-sm text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6">
          <div id="google-login-btn" className="flex justify-center" />
        </div>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
