import React from 'react';
import { Box, Button } from "@mui/material";
import { useTheme } from '@emotion/react';

const CustomPagination = ({ page, pageSize, rowCount, onPageChange }) => {
    console.log(page,pageSize,rowCount,);
    const theme = useTheme()
    const totalPages = Math.ceil(rowCount / 20);
    const handleNextPage = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px',color:'white' }}>
            <Button onClick={handlePrevPage} disabled={page === 1} sx={{color:theme.palette.text.primary}} >
                &lt; Previous
            </Button>
            <span>{`Page ${page} of ${totalPages}`}</span>
            <Button onClick={handleNextPage} disabled={page === totalPages} sx={{color:theme.palette.text.primary}}>
                Next &gt;
            </Button>
        </Box>
    );
};

export default CustomPagination;
