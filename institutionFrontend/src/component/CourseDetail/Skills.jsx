import { Container, Paper, Stack } from '@mui/material'
import React from 'react'
import SkillsDescripctionCard from '../Card/SkillsDescripctionCard'

function Skills() {
    const data = [
        {
            title: 'Prerequisites',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem tempora quasi quod quo eaque aliquid distinctio accusantium, 
            fugiat autem odio harum ipsa et, architecto assumenda adipisci facere incidunt recusandae nemo.`
        },
        {
            title: 'Skills you achieve',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem tempora quasi quod quo eaque aliquid distinctio accusantium, 
            fugiat autem odio harum ipsa et, architecto assumenda adipisci facere incidunt recusandae nemo.`
        },
    ]
  return (
    <>
    <Container>
        <Stack direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        sx={{
            mt:2,
            }}>
            {data.map((item,idx)=>(
                <Paper elevation={3} sx={{ borderRadius: 5 }}>
                    <SkillsDescripctionCard 
                    key={idx}
                    title={item.title}
                    description={item.description}
                    />
                </Paper>
                
            ))}
        </Stack>
    </Container>
      
    </>
  )
}

export default Skills
