import instance  from '../../utils/axios'

async function DeleteLessonVideo(id) {
    const response = await instance.delete(`course-admin/delete_lesson_video/${id}/`);
    return response.data
}

export default DeleteLessonVideo