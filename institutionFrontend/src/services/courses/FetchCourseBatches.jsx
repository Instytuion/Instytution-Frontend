import { noAuthInstance } from '../../utils/axios'

async function FetchCourseBatches(courseName) {
  const response = await noAuthInstance.get(`courses/course_batches/${courseName}`)
  return response
}

export default FetchCourseBatches