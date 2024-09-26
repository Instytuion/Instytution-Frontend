import React from 'react'
import instance  from '../../utils/axios'

async function FetchCourseAdminProgramCourses(programName) {
  const response = await instance.get(`courses/programs/${programName}`)
  return response
}

export default FetchCourseAdminProgramCourses
