import React from 'react'
import instance  from '../../utils/axios'

async function FetchCourseAdminCourses() {
  const response = await instance.get('courses/programs/')
  return response
}

export default FetchCourseAdminCourses
