import React from 'react'
import instance from '../../utils/axios'

async function LitsUsersByRole(role,page=1) {
  const response = await instance.get(`custom-admin/users/role/${role}/?page=${page}`)
  return response.data
}

export default LitsUsersByRole
