import instance from "../../utils/axios"

export const GetInstructors = async(data)=>{
    const response  = await instance.post('accounts/instructor-create/',data)
    console.log('response data from GetInstructores file line number :5',data);
    
    return response.data
}