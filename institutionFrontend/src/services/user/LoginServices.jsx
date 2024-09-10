
import instance from "../../utils/axios"


const LoginServices =async (data)=>{
    const response = await instance.post('accounts/sign-in/',data)
    return response.data;
        
}

export default LoginServices;