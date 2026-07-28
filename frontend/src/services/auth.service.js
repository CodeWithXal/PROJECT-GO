import api from "../lib/axios.js";

async function login(loginData){
    const response = await api.post("/auth/login", loginData);

    return response.data;
}

async function signup(signupData){
    const response = await api.post("/auth/signup", signupData);

    return response.data;
}



async function getCurrentUser(){
    const response = await api.get("/auth/me");

    return response.data;
}

export {login, signup, getCurrentUser};
