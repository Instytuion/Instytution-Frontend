import instance from "../../utils/axios"

const SessionVideos=async(batchName)=>{
    console.log('Iam working-----------------(get session video)',batchName);
    
    const response = await instance.get(`class-room/get-video/${batchName}/`)
    console.log('Response data from getSession Videos is :',response.data);
    
    return response.data
}
export default SessionVideos;