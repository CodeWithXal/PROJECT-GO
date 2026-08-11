import {useState, useRef} from "react";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


function SignupForm(){
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
        });

    const [isSigningUp, setIsSigningUp] = useState(false);
    const [error, setError] = useState("");

    const isSubmitting = useRef(false);

    function handleChange(event){
        setCredentials((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));

    }

    
    async function handleSubmit(event){
        try{
            
            event.preventDefault();
            if(isSubmitting.current){
                return;
            }
            isSubmitting.current = true;
            setIsSigningUp(true);
            setError("")
            
            await signup(credentials); 
            navigate("/login")
            
            
        }
       catch (error) {
            console.error(error);

            const response = error.response?.data;

            if (Array.isArray(response?.error)) {
                // Zod validation errors
                const validationMessage = response.error
                    .map((issue) => issue.message)
                    .join("\n");

                setError(validationMessage);
                toast.error(validationMessage);
            } else {
                // Backend errors
                const message = response?.message || "Something went wrong";

                setError(message);
                toast.error(message);
            }
        }
        finally{
            isSubmitting.current = false;
            setIsSigningUp(false)
        }

        
    }

return(
    <form onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>

        {error && (
            <div>
                {error.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        )}

        <label htmlFor="">Username</label>
       <input 
            type="text" 
            name="username"
            value={credentials.username}
            onChange={handleChange}
        />

       <label htmlFor="">Email</label>
       <input 
            type="email" 
            name="email"
            value={credentials.email}
            onChange={handleChange}
        />

        <label htmlFor="">Password</label>
        <input 
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
        />

        <button disabled={isSigningUp} type="submit">
            {isSigningUp?"Signing Up...":"Sign Up"}
        </button>
    </form>

);
}


export default SignupForm;