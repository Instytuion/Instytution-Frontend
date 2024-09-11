import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommonCard = ({ title, duration, price, image, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Card sx={{ 
        maxWidth: 345, 
        minHeight: 310,
        display: 'flex', 
        flexDirection: 'column', 
        margin: 'auto', 
        cursor: 'pointer',
        boxShadow: 1,
        '&:hover': {
          boxShadow: 8,
        },
      }}
      onClick={handleCardClick}
      >
      <CardMedia>
        <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/02/how-to-create-online-course.webp" alt="Course-image"  sx={{ height: 140, objectFit: 'cover' }}/>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {duration ? (
          <Typography variant="body2" component="div">
            Duration :{duration}
          </Typography>
        ):''}
        {price ? (
          <Typography variant="body2" component="div">
            Price: {price}
          </Typography>
        ):''}
      </CardContent>
    </Card>
  );
};
export default CommonCard;
