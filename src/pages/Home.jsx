import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen text-center p-6 text-white"
      style={{ backgroundImage: "url('https://i.pinimg.com/736x/da/b6/6e/dab66e82a52b6f71e4bfcda785bedb26.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <h1 className="text-5xl font-extrabold text-shadow-lg mb-4">Crimes</h1>
      <p className="text-lg mb-8 max-w-2xl">Read amazing blogs, share your thoughts, and dive deep into the world of crime, mysteries, and investigations.</p>

      {/* Loading State */}
      {blogs.length === 0 ? (
        <p className="text-gray-300">Loading blogs...</p>
      ) : (
        <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }} 
              className="w-full bg-gray-900 bg-opacity-80 rounded-lg shadow-lg overflow-hidden"
            >
              {blog.image && (
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="w-full h-60 object-cover rounded-lg mb-4" 
                                />
                            )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold">{blog.title}</h2>
                <p className="text-gray-300 mt-2">{blog.content.slice(0, 120)}...</p>
                <Link to={`/blogs/${blog._id}`} className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition">Read More</Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
