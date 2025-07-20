export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-50 px-4 py-16">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 mb-4 leading-tight tracking-tight">
          Welcome to <span className="text-gray-800">My Blog</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          Discover inspiring stories, personal thoughts, and useful resources
          shared with love.
        </p>
        <a
          href="/write"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
        >
          Start Writing
        </a>
      </div>
    </section>
  );
}
