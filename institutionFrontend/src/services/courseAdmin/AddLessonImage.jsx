import instance  from '../../utils/axios'

async function AddLessonImage(formData) {
  const response = await instance.post(`course-admin/add_lesson_image/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data
}

export default AddLessonImage