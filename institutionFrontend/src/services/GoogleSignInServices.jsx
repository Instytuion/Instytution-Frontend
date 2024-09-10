import instance from "../utils/axios";

const GoogleSignInServices = async (access_token)=>{
    const response = await instance.post('accounts/google-auth/',access_token)
    console.log('From GoogleSignInServices response data is - ', response.data);
    return response.data;
        
}

export default GoogleSignInServices;