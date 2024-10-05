import instance from "../../utils/axios";

const CourseAdminBatchServices = {
  getBatches: async (courseName) => {
    const response = await instance.get(`/course-admin/batches/${courseName}`);
    return response.data;
  },
  getBatchDetails: async (courseId) => {
    const response = await instance.get(`/course-admin/batch/${courseId}`);
    return response.data;
  },
  crateBatch: async (courseName, data) => {
    const response = await instance.post(
      `/course-admin/batches/${courseName}/`,
      data
    );
    return response.data
  },
  updateBatch: async (batchId, data) => {
    const response = await instance.patch(
      `/course-admin/batch/${batchId}/`,
      data
    );
    return response.data
  },
};

export default CourseAdminBatchServices;
