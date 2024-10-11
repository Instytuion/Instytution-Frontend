import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {convert24To12Hour} from '../../utils/utilityFunctions.js'
import { IconButton } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useNavigate } from 'react-router-dom';

function UpComingBatchTable({rows, actions=false}) {
  const navigate = useNavigate();
  
  return (
    <TableContainer component={Paper} sx={{borderRadius:5, p:2}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Batch Name</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            {actions ? (
                <TableCell align="right">Instructor</TableCell>
              ): null}
            <TableCell align="right">Student Count</TableCell>
            {actions ? (
              <TableCell align="right">Actions</TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row,idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.start_date}</TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
              <TableCell align="right">{convert24To12Hour(row.start_time)}</TableCell>
              <TableCell align="right">{convert24To12Hour(row.end_time)}</TableCell>
              {actions ? (
                <TableCell align="right">{row.instructor_name}</TableCell>
              ): null}
              <TableCell align="right">{row.student_count} / {row.strength}</TableCell>
              {actions ? (
                <TableCell align="right">
                  <IconButton
                  onClick={()=> navigate(`/instructor/class-room/${row.name}/`)}
                  >
                    <LiveTvIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UpComingBatchTable
