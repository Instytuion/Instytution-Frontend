import { Card, Typography } from "@mui/material"


function SkillsDescripctionCard({title, description}) {
  return (
    <>
      <Card sx={{
        width: { xs: '100%', sm: '100%', md: '100%' },
        display: 'flex', 
        flexDirection: 'column', 
        margin: 'auto',
        p:3,
        borderRadius: 5,        
      }}
      >
        <Typography variant="h6" component="h6"
        sx={{
          textAlign:'center',
          borderBottom:2,
        }}
        >
          {title}
        </Typography>
        <Typography variant="body2" component="p"
        sx={{
          mt:1,
        }}
        >
          {description}
        </Typography>
      </Card>
    </>
  )
}

export default SkillsDescripctionCard
