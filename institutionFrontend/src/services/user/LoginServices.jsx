
import instance from "../../utils/axios"


const LoginServices =async (data)=>{
    
        try {
            const response = await instance.post('accounts/sign-in/',data)
            console.log('====================================');
            console.log('response is :',response);
            console.log('====================================');
            return response.data
        } catch (error) {
            console.log('====================================');
            console.log('Error from SignupServices',error);
            console.log('====================================');
        }
    
}
export default LoginServices;