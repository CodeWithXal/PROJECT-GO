import { SignUp } from "@clerk/clerk-react";

export default function Signup(){
  return(
    <div className="signup-form" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <SignUp />
    </div>
  )
}