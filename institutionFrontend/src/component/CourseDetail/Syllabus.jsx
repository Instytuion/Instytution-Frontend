import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import SkillsDescripctionCard from '../Card/SkillsDescripctionCard'

function Syllabus({week_descriptions}) {
    const data = week_descriptions
  return (  
    <Container>
        <Box mt={2}>
        <Typography variant="h5" component="h2" sx={{
            borderBottom:5 ,
            display:'inline-block',
            paddingBottom:1,
            mb:2,
            }}>
            Syllabus
        </Typography>
        <Grid container spacing={2}>
            {data.map((item,idx)=>(
                <Grid item key={idx} xs={12} md={6}>
                    <Paper elevation={3} sx={{ borderRadius: 5 }}>
                        <SkillsDescripctionCard 
                        title={`Week - ${item.week}`}
                        description={item.description}
                        />
                    </Paper>
                </Grid>
            ))}
        </Grid>
        </Box>
    </Container>
  )
}

export default Syllabus
