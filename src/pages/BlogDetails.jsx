import { useEffect, useState } from "react";
import axios from "axios";

const BlogsDetails = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/blogs")
            .then((res) => setBlogs(res.data))
            .catch((err) => console.error("Error fetching blogs:", err));
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-6 text-white"
            style={{ backgroundImage: "url('https://www.shutterstock.com/shutterstock/videos/3442640411/thumb/1.jpg?ip=x480')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <h1 className="text-4xl font-bold text-center mb-8 text-black">Latest Blogs</h1>

            {blogs.length === 0 ? (
                <p className="text-gray-600 text-center text-lg">No blogs available.</p>
            ) : (
                <div className="max-w-4xl mx-auto space-y-6">
                    {blogs.map((blog) => (
                        <div 
                            key={blog._id} 
                            className="bg-white p-6 shadow-md rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            {blog.image && (
                                <div className="w-full h-60 mb-4 rounded-lg overflow-hidden">
                                    <img 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = "none"; }} 
                                    />
                                </div>
                            )}

                            <h2 className="text-2xl font-semibold text-gray-900">{blog.title}</h2>
                            <p className="text-gray-700 mt-3">{blog.content}</p>
                            <p className="text-gray-500 text-sm mt-4">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogsDetails;
