import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

type User = {
  name: string;
  token: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr && userStr !== "undefined") {
      try {
        const parsedUser: User = JSON.parse(userStr);
        setUser(parsedUser);
      } catch (e) {
        console.error("Invalid user JSON:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-tight"
        >
          My<span className="text-gray-800">Blog</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/write"
            className="text-gray-700 hover:text-indigo-600 text-sm font-medium transition"
          >
            Write
          </Link>

          {user ? (
            <>
              <span className="text-sm text-gray-700">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 text-sm hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 pb-4">
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/write"
            className="block py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Write
          </Link>

          {user ? (
            <>
              <div className="py-2 text-gray-700">Welcome, {user.name}</div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block w-full text-center text-red-500 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block mt-2 text-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
