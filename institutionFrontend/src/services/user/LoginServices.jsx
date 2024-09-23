
import { noAuthInstance } from "../../utils/axios"


const LoginServices =async (data)=>{
    const response = await noAuthInstance.post("accounts/sign-in/", data, {
      withCredentials: true, 
    });
    return response.data;
        
}

export default LoginServices;


