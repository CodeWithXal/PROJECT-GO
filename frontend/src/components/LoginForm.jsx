import {useState} from "react";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


function LoginForm(){
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
    email: "",
    password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event){
        console.log(event.target.name, event.target.value);
        setCredentials((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));

    }

    
    async function handleSubmit(event){
        try{
            
            event.preventDefault();
            setIsLoading(true);
            setError("")
            
            console.log(credentials);
            await login(credentials);
            navigate("/dashboard")
            
            
        }
        catch (error) {
            console.error(error);

            // Backend response
            const response = error.response?.data;

            if (response?.error) {
                // Zod validation errors
                const validationMessage = response.error
                    .map((issue) => issue.message)
                    .join("\n");

                setError(validationMessage);
                toast.error(validationMessage);
            } else {
                // Authentication or other backend errors
                const message = response?.message || "Something went wrong";

                setError(message);
                toast.error(message);
            }
        }
        finally{
            setIsLoading(false)
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

        <button disabled={isLoading} type="submit">
            {isLoading?"logging in...":"Login"}
        </button>
    </form>

);
}


export default LoginForm;