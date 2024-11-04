import React from 'react'
import { noAuthInstance } from '../../utils/axios'

async function FetchProgramCourses(programName) {
  const response = await noAuthInstance.get(`courses/programs/${programName}`)
  return response
}

export default FetchProgramCourses
