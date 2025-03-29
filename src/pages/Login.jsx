import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () =>{
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const navigate = useNavigate();


const handleSubmit = (e)=>{
    e.perventDefault();
    Login({email});
    navigate("/blogs")
};

return(
    <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="p-6 shadow-md w-96">
            <h2 className="text-xl mb-4">Login</h2>
            <input type="email" placeholder="Email" className="border p-2 w-full mb-4" value={email} onChange={(e)=>setEmail(e.target.value)}required/>
            <input type="password" placeholder="Password"className="border p-2 w-full mb-4" value={password} onChange={(e)=> setPassword(e.target.value)}required/>
            <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
        </form>
    </div>
)
}

export default Login;