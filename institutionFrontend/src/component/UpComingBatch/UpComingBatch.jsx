import React from 'react'
import { Box, Typography, Container, Paper } from "@mui/material";
import UpComingBatchTable from '../Tables/UpComingBatchTable';

function UpComingBatch() {
    function createData(batchId, date, time, instructor) {
        return { batchId, date, time, instructor };
      }
      
    const data = [
    createData('Batch-1', '10/08/2024', '10:00 Am', 'Adam'),
    createData('Batch-2', '10/09/2024', '10:00 Am', 'Adam'),
    createData('Batch-3', '10/10/2024', '10:00 Am', 'Adam'),
    createData('Batch-4', '10/11/2024', '10:00 Am', 'Adam'),
    createData('Batch-5', '10/12/2024', '10:00 Am', 'Adam'),
    ];
  return (
    <Container>
        <Box mt={2}>
            <Typography variant="h5" component="h2" sx={{
                borderBottom:5 ,
                display:'inline-block',
                paddingBottom:1,
                mb:2,
                }}>
                Up Coming Batches
            </Typography>
            <Paper elevation={3} sx={{borderRadius:5}}>
                <UpComingBatchTable 
                rows={data}
                />
            </Paper>
        </Box>
    </Container>
  )
}

export default UpComingBatch
