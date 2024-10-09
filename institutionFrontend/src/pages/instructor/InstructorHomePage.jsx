import { Container } from '@mui/material'
import React from 'react'
import UpComingBatchTable from '../../component/Tables/UpComingBatchTable'

function InstructorHomePage() {
    
  return (
    <Container
    sx={{py:4}}
    >
      <UpComingBatchTable />
    </Container>
  )
}

export default InstructorHomePage
