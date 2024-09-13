import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import SkillsDescripctionCard from '../Card/SkillsDescripctionCard'

function Syllabus() {
    const data = [
        {
            title: 'Week-1',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem tempora quasi quod quo eaque aliquid distinctio accusantium, 
            fugiat autem odio harum ipsa et, architecto assumenda adipisci facere incidunt recusandae nemo.`
        },
        {
            title: 'Week-2',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem tempora quasi quod quo eaque aliquid distinctio accusantium, 
            fugiat autem odio harum ipsa et, architecto assumenda adipisci facere incidunt recusandae nemo.`
        },
        {
            title: 'Week-3',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem tempora quasi quod quo eaque aliquid distinctio accusantium, 
            fugiat autem odio harum ipsa et, architecto assumenda adipisci facere incidunt recusandae nemo.`
        },
        {
            title: 'Week-4',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem tempora quasi quod quo eaque aliquid distinctio accusantium, 
            fugiat autem odio harum ipsa et, architecto assumenda adipisci facere incidunt recusandae nemo.`
        },
    ]
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
                        title={item.title}
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
