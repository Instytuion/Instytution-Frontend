import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import GoogleSignInServices from '../services/GoogleSignInServices';
import { useNavigate } from "react-router-dom";



const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignIn = () => {
  const navigate = useNavigate();
  
  const handleSuccess = async (data) => {
    try{
      console.log("Google Sign-In Success:", data);
      const access_token = data.credential
      const response = await GoogleSignInServices(access_token)
      
      navigate("/");
      console.log('From GoogleSignIn- response is - ', response);
    }
    catch (error) {
      console.log('Some error while sending google token to backend', error);
    }
    
  };

  const handleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleFailure}
      text="Sign in with Google"
      width="300px"
      theme="outline"
      shape="pill"
      
    />
  </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
