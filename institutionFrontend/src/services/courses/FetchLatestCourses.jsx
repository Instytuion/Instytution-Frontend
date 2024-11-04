import React from 'react'
import { noAuthInstance } from '../../utils/axios'

async function FetchLatestCourses() {
  const response = await noAuthInstance.get('courses/latest_courses/')
  return response
}

export default FetchLatestCourses
