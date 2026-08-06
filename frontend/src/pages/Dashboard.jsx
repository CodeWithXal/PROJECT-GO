import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const {
        user,
        isLoading,
        isLoggingOut,
        logout
    } = useAuth();

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        }
        catch {
            // Already handled by toast
        }
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h3>Welcome, {user.username}</h3>

            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
            >
                {isLoggingOut ? "Logging Out..." : "Logout"}
            </button>
        </div>
    );
}

export default Dashboard;