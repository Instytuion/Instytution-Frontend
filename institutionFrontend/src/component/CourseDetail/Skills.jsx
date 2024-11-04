import { Container, Paper, Stack } from '@mui/material'
import React from 'react'
import SkillsDescripctionCard from '../Card/SkillsDescripctionCard'

function Skills({prerequisite, skill}) {
    const data = [
        {
            title: 'Prerequisites',
            description: prerequisite
        },
        {
            title: 'Skills you achieve',
            description: skill
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
                <Paper elevation={3} sx={{ borderRadius: 5 }} key={idx}>
                    <SkillsDescripctionCard 
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
