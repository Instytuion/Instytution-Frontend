import { Card, Typography } from "@mui/material"


function CourseDescripctionCard({title, description}) {
  return (
    <>
      <Card sx={{
         maxWidth: 345, 
         minHeight: 310,
         display: 'flex', 
         flexDirection: 'column', 
         margin: 'auto',
      }}
      >
        <Typography variant="h6" component="h6">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
            {description}
          </Typography>
      </Card>
    </>
  )
}

export default CourseDescripctionCard
