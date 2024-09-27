import instance  from '../../utils/axios'

async function PostCourseLessons(courseName, data) {
  const response = await instance.post(`course-admin/addLessons/${courseName}`, data);
  return response.data
}

export default PostCourseLessons