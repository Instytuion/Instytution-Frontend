import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function UpComingBatchTable({rows}) {
  return (
    <TableContainer component={Paper} sx={{borderRadius:5, p:2}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Batch Name</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Instructor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.start_date}</TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
              {row.time_slot === 'morning' ? (
                <TableCell align="right">{row.time_slot} (8 - 10 Am)</TableCell>
              ) : (
                <TableCell align="right">{row.time_slot} (2 - 4 Pm)</TableCell>
              )}
              <TableCell align="right">{row.instructor_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UpComingBatchTable
