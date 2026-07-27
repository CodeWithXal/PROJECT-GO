import axios from "axios"; 
const api = axios.create(
    { 
        baseURL : import.meta.env.VITE_API_BASE_URL, // get the base url from env 
        withCredentials: true, 
        headers : { "Content-Type": "application/json" }
    }
);

export default api;