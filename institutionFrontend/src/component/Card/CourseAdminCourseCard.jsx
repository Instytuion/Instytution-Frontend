import { useTheme } from "@emotion/react";
import { Grid, Card, Typography, CardMedia, CardContent, IconButton, Button, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CourseAdminCard = ({ courses, onEdit, onDelete, onViewBatches }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} justifyContent="center">
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <Card sx={{
            maxWidth: 345,
            minHeight: 454,
            maxHeight: 450,
            boxShadow: theme.palette.shadow,
            transition: "box-shadow 0.5s ease",
            borderRadius: 4,
          }}>
            <CardMedia
              component="img"
              height="140"
              image={course.image}
              alt={course.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Program:</strong> {course.program}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Price:</strong> ${course.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Duration:</strong> {course.duration} weeks
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1, 
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {course.description}
              </Typography>
              <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton onClick={() => onEdit(course.id)} color="primary" sx={{
                    color:theme.palette.customColors
                }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(course.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
                <Button 
                  onClick={() => onViewBatches(course.id)} 
                  variant="contained" 
                  sx={{
                    bgcolor:theme.palette.customColors
                  }}
                >
                  View Batches
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseAdminCard;
