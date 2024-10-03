import instance  from '../../utils/axios'

async function AddLessonPdf(formData) {
  const response = await instance.post(`course-admin/add_lesson_pdf/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data
}

export default AddLessonPdf