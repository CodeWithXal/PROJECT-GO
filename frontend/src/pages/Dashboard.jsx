import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";


function Dashboard() {
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect( () => {
    async function fetchUser(){
      try{
        const currentUser = await getCurrentUser();
        setUser(currentUser.data);
      }
      catch(error){
        console.error(error)
        setError(error.message);
      }
      finally{
            setIsLoading(false)
      }
    }

    fetchUser();
  },[])
  if (isLoading) {
      return <h1>Loading...</h1>;
  }

  if (error) {
      return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
}

  return (
      <div>
          <h1>Welcome, {user.username}</h1>
      </div>
  );
}

export default Dashboard;