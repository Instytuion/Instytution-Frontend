import instance  from '../../utils/axios'

async function DeleteLessonPdf(id) {
    const response = await instance.delete(`course-admin/delete_lesson_pdf/${id}/`);
    return response.data
}

export default DeleteLessonPdf