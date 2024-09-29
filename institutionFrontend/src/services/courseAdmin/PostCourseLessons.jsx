import instance  from '../../utils/axios'

async function PostCourseLessons(courseName, formData) {
  const response = await instance.post(`course-admin/add_lessons/${courseName}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data
}

export default PostCourseLessons