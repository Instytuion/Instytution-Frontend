import React from 'react'
import instance from '../../utils/axios'

async function FetchLatestCourses() {
  const response = await instance.get('courses/latest_courses/')
  return response
}

export default FetchLatestCourses
