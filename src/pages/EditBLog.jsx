import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/blogs/${id}`, { title, content })
      .then(() => navigate(`/blogs/${id}`))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="p-6 shadow-md w-96">
        <h2 className="text-xl mb-4">Edit Blog</h2>
        <input type="text" placeholder="Title" className="border p-2 w-full mb-4" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" className="border p-2 w-full mb-4" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 w-full">Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
