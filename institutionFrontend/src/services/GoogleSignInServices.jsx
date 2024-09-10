import instance from "../utils/axios";

const GoogleSignInServices = async (token)=>{
    const response = await instance.post('accounts/google-auth/',{access_token: token})
    console.log('From GoogleSignInServices response data is - ', response.data);
    return response.data;
        
}

export default GoogleSignInServices;