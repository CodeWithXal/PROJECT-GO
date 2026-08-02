import useAuth from "../hooks/useAuth";


function Dashboard() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
      return <h1>Loading...</h1>;
  }

  return (
      <div>
          <h1>Welcome, {user.username}</h1>
      </div>
  );
}

export default Dashboard;