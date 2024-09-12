
import instance from "../../utils/axios"


const ResentOtp =async (email)=>{
    console.log('email from resent option :',email);
    
    const response = await instance.post('accounts/resent-otp/',{
        email : email
    })
    return response.data;
    
}

export default ResentOtp;