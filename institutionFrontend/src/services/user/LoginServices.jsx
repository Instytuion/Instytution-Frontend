
import instance from "../../utils/axios"


const LoginServices =async (data)=>{
    const response = await instance.post('accounts/sign-in/',data)
    console.log('From LoginService response data is - ', response.data);
    return response.data;
        
}

export default LoginServices;