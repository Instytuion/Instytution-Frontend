import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function RatingComponent({ value, readOnly, count, sx }) {
    console.log('====================================');
    console.log('copunt :',count);
    console.log('====================================');
  return (
    <Stack gap={1}   sx={sx} flexDirection={'row'} alignItems="center">
      <Rating 
    
        name="half-rating" 
        defaultValue={value} 
        precision={0.1} 
       
        readOnly={readOnly} 
      />
      <Typography  variant="body1">({count})</Typography>
    </Stack>
  );
}
