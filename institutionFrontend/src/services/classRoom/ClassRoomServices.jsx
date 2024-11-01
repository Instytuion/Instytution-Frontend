import instance from "../../utils/axios";

const ClassRoomServices = {
    uploadVideoChunks: async (formData, batchName, videoChunkSerial)=>{
        const response = await instance.post(`class-room/video-chunks/${batchName}/${videoChunkSerial.current}/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data
    },
    bindVideoChunk: async (date, batchName)=>{
        const response = await instance.post(`class-room/bind-video-chunks/${batchName}/${date}/`);
        return response.data
    },

}

export default ClassRoomServices