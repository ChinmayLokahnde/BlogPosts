import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="bg-black p-4 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold">Crime&News</Link>
      <div>
        <Link to="/blogs" className="mr-4">Blogs</Link>
        <Link to="/create" className="mr-4">Create</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};




export default Navbar;