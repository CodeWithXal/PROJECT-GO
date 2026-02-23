import { SignIn } from "@clerk/clerk-react";

export default function Login(){
  return(
    <div className="login-form" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <SignIn />
    </div>
  );
}

