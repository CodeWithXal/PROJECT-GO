import { createContext, useState, useEffect } from "react";
import { getCurrentUser, signupService, loginService, logoutService } from "../services/auth.service";
import { toast } from "react-hot-toast"

const AuthContext = createContext();

function AuthProvider({ children }) {
    const[isLoggingOut, setIsLoggingOut] = useState(false)
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function refreshUser(){
                const currentUser = await getCurrentUser();
                setUser(currentUser.data);
    }

    useEffect(() => {
        async function initializeAuth() {
            try {
                await refreshUser();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        initializeAuth();
    }, []);

    async function login(credentials){   
                await loginService(credentials);
                await refreshUser();
                toast.success("Login Successful");
    }

    async function signup(credentials){
        await signupService(credentials);
        toast.success("Signup Successful")
    }

    async function logout() {
        try{
            setIsLoggingOut(true);
            await logoutService();
            setUser(null);
            toast.success("Logged out successfully");
        }
        catch(error){
            console.error("Logout Error :", error);
            toast.error("Logout failed");
            throw error;
        }
        finally{
            setIsLoggingOut(false);
        }
    }


    const isAuthenticated = user !== null;

    return(
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                isLoggingOut,
                logout,
                login,
                signup,
                refreshUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

