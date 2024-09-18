import { noAuthInstance } from '../../utils/axios'

async function FetchRelatedCourse(courseName) {
  const response = await noAuthInstance.get(`courses/related_courses/${courseName}`)
  return response
}

export default FetchRelatedCourse