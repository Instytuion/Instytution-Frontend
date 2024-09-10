import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const CourseCard = ({ title, duration, price, image }) => {
  console.log("data s are :", title, duration, price, image);

  return (
    <Card sx={{ 
        maxWidth: 345, 
        minHeight: 310,
        display: 'flex', 
        flexDirection: 'column', 
        margin: 'auto' 
      }}>
      <CardMedia>
        <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/02/how-to-create-online-course.webp" alt="Course-image"  sx={{ height: 140, objectFit: 'cover' }}/>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" component="div">
          Duration :{duration}
        </Typography>
        <Typography variant="body2" component="div">
          Price: {price}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CourseCard;
