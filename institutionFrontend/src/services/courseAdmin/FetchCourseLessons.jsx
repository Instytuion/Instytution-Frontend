import instance  from '../../utils/axios'

async function FetchCourseLessons(courseName) {
  const response = await instance.get(`course-admin/lessons/${courseName}/`);
  return response.data
}

export default FetchCourseLessons