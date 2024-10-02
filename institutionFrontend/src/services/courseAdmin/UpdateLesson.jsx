import instance  from '../../utils/axios'

async function UpdateLesson(id, formData) {
    const response = await instance.patch(`course-admin/update_lesson/${id}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
    return response.data
}
export default UpdateLesson
