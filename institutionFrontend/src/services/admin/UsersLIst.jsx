import React from 'react'
import instance from '../../utils/axios'

async function LitsUsersByRole(role, page, pageSize, search, userRole) {
  console.log('userRole', userRole)
  const url =
    userRole === "admin"
      ? `custom-admin/users/role/${role}/?page=${page}`
      : `custom-admin/instructors/${role}/`;
    console.log(url)
  const response = await instance.get(url)
  return response.data;
};

export default LitsUsersByRole
