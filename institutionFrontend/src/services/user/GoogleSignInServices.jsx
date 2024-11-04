import { noAuthInstance } from "../../utils/axios";


const GoogleSignInServices = async (token)=>{
    const response = await noAuthInstance.post('accounts/google-auth/',{access_token: token},{
        withCredentials: true
    })
    return response.data;
        
}

export default GoogleSignInServices;