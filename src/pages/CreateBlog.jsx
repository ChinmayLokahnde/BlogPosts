import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");  
    const [imageUrl, setImageUrl] = useState("");  
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/blogs", {
                title,
                content,
                image: imageUrl || image,  
            });
            console.log("Blog Created:", res.data);
            navigate("/blogs");
        } catch (err) {
            console.error("Error creating blog:", err.response?.data || err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2"
                    required
                />
                
                
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2"
                />
                
                
                <input
                    type="text"
                    placeholder="Enter Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="border p-2"
                />

                
                {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
                ) : (
                    image && <img src={image} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
                )}

                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Create</button>
            </form>
        </div>
    );
};

export default CreateBlog;
