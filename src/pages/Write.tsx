export default function Write() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4 py-16">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Write a New Blog Post
        </h1>

        <form className="space-y-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter post title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              placeholder="Write your post content here..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition"
          >
            Publish Post
          </button>
        </form>
      </div>
    </section>
  );
}
