import api from "../lib/axios.js";

async function loginService(credentials){
    const response = await api.post("/auth/login", credentials);

    return response.data;
}

async function signupService(credentials){
    const response = await api.post("/auth/signup", credentials);

    return response.data;
}

async function logoutService() {
    const response = await api.post("/auth/logout");
    return response.data;
} 


async function getCurrentUser(){
    const response = await api.get("/auth/me");

    return response.data;
}

export {loginService, signupService, logoutService, getCurrentUser};
