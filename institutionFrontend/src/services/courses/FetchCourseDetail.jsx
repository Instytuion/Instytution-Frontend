import React from 'react'
import { noAuthInstance } from '../../utils/axios'

async function FetchCourseDetail(CourseName) {
  const response = await noAuthInstance.get(`courses/course_detail/${CourseName}`)
  return response
}

export default FetchCourseDetail