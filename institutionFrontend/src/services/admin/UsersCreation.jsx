import instance from "../../utils/axios"

export  const  CreateUsersByRole = async (data) => {
    console.log('====================================');
    console.log('data from services file:',data);
    console.log('====================================');
    const response = await instance.post('accounts/subadmin-create/',data)
    return response.data
  }
  