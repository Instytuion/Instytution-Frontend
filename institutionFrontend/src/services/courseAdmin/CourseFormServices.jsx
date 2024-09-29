import instance from "../../utils/axios";

const CourseFormServices = {
  CreateCourse: async (data) => {
    const response = await instance.post("/course-admin/courses/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  UpdateCourse: async (data, courseName) => {
    const response = await instance.patch(
      `/course-admin/courses/update/${courseName}/`,
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

export default CourseFormServices;