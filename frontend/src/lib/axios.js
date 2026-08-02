import axios from "axios"; 
const api = axios.create(
    { 
        baseURL : import.meta.env.VITE_API_BASE_URL, // get the base url from env 
        withCredentials: true, 
        headers : { "Content-Type": "application/json" }
    }
);


// response interceptor
api.interceptors.response.use(
    (response) => {
        // pass successfull responses through unchanged
        return response
    },
    (error) => {
        // handle invalid or expired tokens
        if(
            error.response?.status === 401 &&
            error.config?.url !== "/auth/login"
        ) {
            window.location.href = "/login";
        }

        // let the component handle error as well
        return Promise.reject(error);
    }
)
export default api;