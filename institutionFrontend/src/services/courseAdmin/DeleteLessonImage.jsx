import instance  from '../../utils/axios'

async function DeleteLessonImage(id) {
    const response = await instance.delete(`course-admin/delete_lesson_image/${id}/`);
    return response.data
}

export default DeleteLessonImage