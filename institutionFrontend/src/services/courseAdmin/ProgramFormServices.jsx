import instance from "../../utils/axios";

const programFormServices = {
  getProgram: async (programName) => {
    const response = await instance.get(`/course-admin/program/${programName}`);
    return response.data;
  },
  createProgram: async (data) => {
    const response = await instance.post(`/course-admin/programs/`, data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  updateCourse: async (data, programName) => {
    const response = await instance.patch(
      `/course-admin/program/${programName}/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

export default programFormServices;
