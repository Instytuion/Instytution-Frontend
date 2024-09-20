import React from 'react'
import instance from '../../utils/axios'

async function LitsUsersByRole(role) {
  const response = await instance.get(`custom-admin/users/role/${role}`)
  return response.data
}

export default LitsUsersByRole
