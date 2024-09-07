import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignIn = () => {
  const handleSuccess = (response) => {
    console.log("Google Sign-In Success:", response);
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