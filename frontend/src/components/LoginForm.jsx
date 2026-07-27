import {useState} from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";


function LoginForm(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: "",
    password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event){
        
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));

    }

    
    async function handleSubmit(event){
        try{
            
            event.preventDefault();
            setIsLoading(true);
            setError("")

            const response = await login(formData);
            if(response.success){
            navigate("/dashboard")
        }
            
            
        }
        catch(error){
            setError(error.message)
            console.error(error)
        }
        finally{
            setIsLoading(false)
        }

        
    }

return(
    <form onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>

        {error && <p>{error}</p>}

       <label htmlFor="">Email</label>
       <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
        />

        <label htmlFor="">Password</label>
        <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
        />

        <button disabled={isLoading} type="submit">
            {isLoading?"logging in...":"Login"}
        </button>
    </form>

);
}


export default LoginForm;