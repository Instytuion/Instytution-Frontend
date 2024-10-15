import instance from "../../utils/axios";

const InstructorServices = {
    getInstructorBatches : async ()=> {
        const response = await instance.get(`/instructor/batches/`);
        console.log('fetched data - ', response.data);
        
        return response.data;
    },
}

export default InstructorServices