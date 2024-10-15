import instance from "../../utils/axios"

const MyCourseService = async ({queryKey})=>{
    const [, email] = queryKey;
    console.log('email from services file ',email);
    
    const response = await instance.get(`courses/students/${email}/`)
    return response.data
}
export default MyCourseService; 