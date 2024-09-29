import instance from "../../utils/axios";

async function FetchCourseDetails(name) {
  const response = await instance.get(`course-admin/courses/${name}/`);
  return response.data;
}

export default FetchCourseDetails;
