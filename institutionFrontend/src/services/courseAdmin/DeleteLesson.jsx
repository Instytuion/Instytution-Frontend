import instance  from '../../utils/axios'

async function DeleteLesson(id) {
    const response = await instance.delete(`course-admin/delete_lesson/${id}/`);
    return response.data
}

export default DeleteLesson
