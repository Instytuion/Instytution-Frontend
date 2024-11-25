import { noAuthInstance } from "../../utils/axios";



const SignupServices = {
  signup: async (data) => {
    const response = await noAuthInstance.post('accounts/sign-up/',data)
    return response.data;
  },

  verifyOtp: async (email,password, otp ) => {
    console.log('datas to sent verify.,:',email,password, otp );

    const response = await noAuthInstance.post('accounts/verify-otp/',{
        email:email,
        password:password,
        otp:otp
    } )
    return response.data;
  },
};

export default SignupServices;
