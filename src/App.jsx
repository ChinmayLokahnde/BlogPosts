import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/BlogDetails";
import Create from "./pages/CreateBlog";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blogs />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;