import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect( () => {
        async function fetchUser(){
            try{
                const currentUser = await getCurrentUser();
                setUser(currentUser.data);
            }
            catch(error){
                console.error(error);
            }
            finally{
                    setIsLoading(false)
            }
        }

        fetchUser();

    },[]);

    const isAuthenticated = user !== null;

    return(
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

