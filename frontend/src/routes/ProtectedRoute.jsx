import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {
    const { isLoading, isAuthenticated } = useAuth();

    if(isLoading){
        return <h1>Loading ... </h1>
    }

    if(isAuthenticated){
        return children
    }
    return <Navigate to="/login" replace />
}

export default ProtectedRoute;