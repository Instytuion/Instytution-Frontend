import React from 'react'
import { noAuthInstance } from '../../utils/axios'

async function FetchPrograms() {
  const response = await noAuthInstance.get('courses/programs/')
  return response
}

export default FetchPrograms
