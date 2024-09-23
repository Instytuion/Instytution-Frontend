import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Radio, Typography } from '@mui/material';
import { useContext } from 'react';
import EnrollBatchContext from '../../Context/enrollBatchContext';


function EnrollBatches({rows}) {
    const {selectedRowId, setSelectedRowId} = useContext(EnrollBatchContext);
    const handleRadioChange = (id) => {
        setSelectedRowId(id);
      };
  return (
    <>
        <Typography variant="h5" component="h5" sx={{
                display:'inline-block',
                paddingBottom:1,
                mb:2,
                }}>
                Select batch
            </Typography>
        <TableContainer component={Box} sx={{}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Batch Name</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Instructor</TableCell>
                <TableCell align="right">
                    Student Count
                    <br />
                    <Typography variant="body2" color="red">(Maximum 9)</Typography>
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>
                        <Radio
                        checked={selectedRowId === row.id}
                        disabled={row.student_count >= 9}
                        onChange={() => handleRadioChange(row.id)}
                        value={row.id}
                        name="enroll-radio-buttons"
                        inputProps={{ 'aria-label': row.name }}
                        sx={{
                            color:'#00796b',
                            '&.Mui-checked': {
                                color: '#00796b',
                            },
                        }}
                        />
                    </TableCell>
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
                    <TableCell align="right">{row.student_count} / 9</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  )
}

export default EnrollBatches
