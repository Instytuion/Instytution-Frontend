
import { noAuthInstance } from "../../utils/axios"


const LoginServices =async (data)=>{
    const response = await noAuthInstance.post('accounts/sign-in/',data)
    return response.data;
        
}

export default LoginServices;